import { openingRoutes } from './opening-balances.mjs';
import { transaction } from './transaction.mjs';
import { tenancyRoutes } from './tenancies.mjs';
import express from 'express';
import { z } from 'zod';
import { randomUUID, randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
const id = () => randomUUID();
const text = z.string().trim().min(1).max(200);
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);
const cents = z.number().int().positive().max(100000000);
const hashToken = t => createHash('sha256').update(t).digest('hex');
function passwordHash(password, salt = randomBytes(16).toString('hex')) { return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => { const d = new Date(s); return !isNaN(+d) && d.toISOString().slice(0,10) === s && s <= new Date().toISOString().slice(0,10); }, 'Use a valid date no later than today');
export function app(db) {
 const api = express();
 api.use(express.json({limit:'32kb'}));
 api.use((req,res,next) => { res.set('Access-Control-Allow-Origin','*'); res.set('Access-Control-Allow-Headers','Content-Type, Authorization'); res.set('Access-Control-Allow-Methods','GET, POST, OPTIONS'); res.set('Cache-Control','no-store'); if(req.method==='OPTIONS') return res.sendStatus(204); next(); });
 const rows = async (sql,args=[]) => (await db.query(sql,args)).rows;
 const attempts = new Map();
 api.post('/auth/:action', async(req,res) => {
  const key=req.ip; const now=Date.now(); const recent=(attempts.get(key)||[]).filter(t=>now-t<60000); if(recent.length>=15) return res.status(429).json({error:'Too many attempts. Try again in a minute.'}); attempts.set(key,[...recent,now]);
  const input=z.object({name:text.optional(),email:z.string().email().max(200).transform(s=>s.toLowerCase()),password:z.string().min(10).max(128)}).parse(req.body);
  let account;
  if(req.params.action==='register') {
   if(!input.name) return res.status(400).json({error:'Your name is required.'});
   account=(await rows('INSERT INTO accounts VALUES ($1,$2,$3,$4) RETURNING id,name,email',[id(),input.name,input.email,passwordHash(input.password)]))[0];
  } else if(req.params.action==='login') {
   account=(await rows('SELECT * FROM accounts WHERE email=$1',[input.email]))[0];
   const stored=account?.password || passwordHash('dummy-password'); const candidate=passwordHash(input.password,stored.split(':')[0]);
   if(!account || !timingSafeEqual(Buffer.from(stored),Buffer.from(candidate))) return res.status(401).json({error:'Email or password is incorrect.'});
  } else return res.sendStatus(404);
  const token=randomBytes(32).toString('hex');
  await rows("INSERT INTO sessions VALUES ($1,$2,now()+interval '7 days')",[hashToken(token),account.id]);
  res.json({token,account:{id:account.id,name:account.name,email:account.email}});
 });
 api.use(async(req,res,next) => {const token=req.headers.authorization?.replace(/^Bearer /,''); const session=token && (await rows('SELECT owner FROM sessions WHERE token=$1 AND expires>now()',[hashToken(token)]))[0]; if(!session)return res.status(401).json({error:'Please sign in again.'}); req.owner=session.owner; next();});
 api.post('/logout',async(req,res)=>{await rows('DELETE FROM sessions WHERE token=$1',[hashToken(req.headers.authorization.replace(/^Bearer /,''))]);res.json({ok:true});});
 api.get('/state',async(req,res)=>{
  const result={}; for(const table of ['properties','rooms','tenancies','charges','payments','rent_changes','opening_balances']) result[table]=await rows(`SELECT * FROM ${table} WHERE owner=$1`,[req.owner]);
  res.json(result);
 });
 api.post('/properties',async(req,res)=>{const p=z.object({name:text,address:text}).parse(req.body);res.json((await rows('INSERT INTO properties VALUES ($1,$2,$3,$4) RETURNING *',[id(),req.owner,p.name,p.address]))[0]);});
 api.post('/rooms',async(req,res)=>{const p=z.object({property_id:text,name:text}).parse(req.body);if(!(await rows('SELECT id FROM properties WHERE id=$1 AND owner=$2',[p.property_id,req.owner])).length)return res.status(404).json({error:'Property not found.'});res.json((await rows('INSERT INTO rooms VALUES ($1,$2,$3,$4) RETURNING *',[id(),req.owner,p.property_id,p.name]))[0]);});
 tenancyRoutes(api, db);
 openingRoutes(api, db);
 api.post('/payments',async(req,res)=>{const result=await transaction(db,async tx=>{const rows=async(sql,args=[])=>(await tx.query(sql,args)).rows;const p=z.object({id:z.string().uuid(),tenancy_id:text,amount:cents,method:z.enum(['Cash','EFT','Bank deposit']),paid_on:date,reference:z.string().trim().max(200)}).parse(req.body);if(!(await rows('SELECT id FROM tenancies WHERE id=$1 AND owner=$2',[p.tenancy_id,req.owner])).length){const e=new Error('Tenant not found.');e.status=404;throw e;}await rows('SELECT r.id FROM rooms r JOIN tenancies t ON t.room_id=r.id WHERE t.id=$1 AND t.owner=$2 FOR UPDATE OF r',[p.tenancy_id,req.owner]);const existing=(await rows('SELECT * FROM payments WHERE id=$1',[p.id]))[0];if(existing){if(existing.owner!==req.owner || existing.tenancy_id!==p.tenancy_id || existing.amount!==p.amount || existing.method!==p.method || (existing.paid_on instanceof Date ? existing.paid_on.toISOString().slice(0,10) : String(existing.paid_on).slice(0,10))!==p.paid_on || existing.reference!==p.reference){const e=new Error('Payment reference already used. Refresh before retrying.');e.status=409;throw e;}return existing;}const opening=(await rows('SELECT as_on::text FROM opening_balances WHERE tenancy_id=$1 AND voided_at IS NULL',[p.tenancy_id]))[0];if(opening&&p.paid_on<opening.as_on){const e=new Error('This payment predates the opening balance. It is already included in the imported balance.');e.status=409;throw e;}return (await rows('INSERT INTO payments (id,owner,tenancy_id,amount,method,paid_on,reference) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[p.id,req.owner,p.tenancy_id,p.amount,p.method,p.paid_on,p.reference]))[0];});res.json(result);});
 api.post('/payments/:id/void',async(req,res)=>{const p=z.object({reason:text}).parse(req.body);const result=await rows('UPDATE payments SET void_reason=$1,voided_at=now() WHERE id=$2 AND owner=$3 AND voided_at IS NULL RETURNING *',[p.reason,req.params.id,req.owner]);if(!result.length)return res.status(404).json({error:'Payment not found or already reversed.'});res.json(result[0]);});
 api.use((err,req,res,next)=>{if(err.status && [400,404,409].includes(err.status))return res.status(err.status).json({error:err.message});if(err instanceof z.ZodError)return res.status(400).json({error:err.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('\n')});if(err.code==='23505')return res.status(409).json({error:'This record already exists. Use a different name or sign in.'});console.error(err);res.status(500).json({error:'Could not save your changes. Please try again.'});});
 return api;
}
