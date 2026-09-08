import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { database } from './db.mjs';
import { app } from './app.mjs';

async function fixture(t) {
  const db = await database(null, 'memory://');
  const server = app(db).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await db.close(); });
  const call = async (url, body, token) => {
    const r = await fetch(`http://127.0.0.1:${server.address().port}${url}`, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, ...(body ? { body: JSON.stringify(body) } : {}) });
    return { status: r.status, body: await r.json() };
  };
  const a = (await call('/auth/register', { name:'A',email:'a@example.com',password:'password-long-A' })).body.token;
  const b = (await call('/auth/register', { name:'B',email:'b@example.com',password:'password-long-B' })).body.token;
  const property = (await call('/properties', {name:'Test yard',address:'Test address'}, a)).body;
  const room = (await call('/rooms', {property_id:property.id,name:'Room 1'}, a)).body;
  const input = { room_id:room.id,name:'Original renter',phone:'',rent:150000,due_day:1,start_on:'2026-01-01' };
  return { db,call,a,b,room,input };
}

test('move-out preserves ledger, permits a later replacement and scopes monthly charges', async t => {
  const {call,a,b,input} = await fixture(t);
  const first = (await call('/tenancies',input,a)).body;
  assert.equal(first.start_date_estimated,false);
  await call('/charges',{month:'2026-01'},a);
  const payment = {id:randomUUID(),tenancy_id:first.id,amount:100000,method:'Cash',paid_on:'2026-01-10',reference:'January'};
  await call('/payments',payment,a);
  assert.equal((await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Moved home'},b)).status,404);
  const ended = await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Moved home'},a);
  assert.equal(ended.status,200);
  const replay = await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Moved home'},a);
  assert.equal(replay.body.ended_at,ended.body.ended_at);
  assert.equal((await call('/tenancies/'+first.id+'/end',{end_on:'2026-02-01',reason:'Changed'},a)).status,409);
  assert.equal((await call('/tenancies',{...input,start_on:'2026-01-31'},a)).status,409);
  const second = (await call('/tenancies',{...input,name:'Replacement',start_on:'2026-02-01'},a)).body;
  assert.ok(second.id);
  await call('/charges',{month:'2026-01'},a);
  await call('/charges',{month:'2026-02'},a);
  const state = (await call('/state',undefined,a)).body;
  assert.equal(state.tenancies.length,2);
  assert.equal(state.tenancies.filter(x=>!x.end_on).length,1);
  assert.deepEqual(state.charges.map(x=>[x.tenancy_id,x.month]).sort(),[[first.id,'2026-01'],[second.id,'2026-02']].sort());
  assert.equal(state.payments[0].id,payment.id);
  assert.equal(state.charges.find(x=>x.tenancy_id===first.id).amount-state.payments[0].amount,50000);
  assert.equal((await call('/payments',{...payment,id:randomUUID(),amount:50000,paid_on:'2026-02-10'},a)).status,200);
  assert.equal((await call('/state',undefined,b)).body.tenancies.length,0);
});

test('invalid dates, inconsistent months and premature move-outs are rejected without changes', async t => {
  const {call,a,input} = await fixture(t);
  assert.equal((await call('/tenancies',{...input,start_on:'2026-02-30'},a)).status,400);
  assert.equal((await call('/tenancies',{...input,start_on:'2099-01-01'},a)).status,400);
  assert.equal((await call('/tenancies',{...input,start_month:'2026-02'},a)).status,400);
  const first = (await call('/tenancies',input,a)).body;
  for (const end_on of ['2025-12-31','2026-02-30','2099-01-01']) assert.equal((await call('/tenancies/'+first.id+'/end',{end_on,reason:'Test'},a)).status,400);
  assert.equal((await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'   '},a)).status,400);
  await call('/charges',{month:'2026-02'},a);
  assert.equal((await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Backdated'},a)).status,409);
  const state = (await call('/state',undefined,a)).body;
  assert.equal(state.tenancies[0].end_on,null);
  assert.equal(state.charges.length,1);
});

test('concurrent replacements allow one active tenancy; concurrent move-outs replay safely', async t => {
  const {call,a,input} = await fixture(t);
  const created = await Promise.all([call('/tenancies',input,a),call('/tenancies',{...input,name:'Racer'},a)]);
  assert.deepEqual(created.map(x=>x.status).sort(),[200,409]);
  const first = created.find(x=>x.status===200).body;
  const ended = await Promise.all([call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Moved'},a),call('/tenancies/'+first.id+'/end',{end_on:'2026-01-31',reason:'Moved'},a)]);
  assert.deepEqual(ended.map(x=>x.status),[200,200]);
  assert.equal(ended[0].body.ended_at,ended[1].body.ended_at);
});

test('same-month handover is date-safe and uses the documented full-month charges', async t => {
  const {call,a,input} = await fixture(t);
  const first = (await call('/tenancies',input,a)).body;
  await call('/tenancies/'+first.id+'/end',{end_on:'2026-01-15',reason:'Moved'},a);
  const second = (await call('/tenancies',{...input,start_on:'2026-01-16'},a)).body;
  assert.ok(second.id);
  await call('/charges',{month:'2026-01'},a);
  const state = (await call('/state',undefined,a)).body;
  assert.equal(state.charges.length,2);
  assert.equal(state.charges.reduce((n,c)=>n+c.amount,0),300000);
});

test('populated legacy database migrates once, preserves money and survives reopen', async () => {
  const prefix = path.join(tmpdir(),'kasirent-migration-');
  const dir = await mkdtemp(prefix);
  let db;
  try {
    db = new PGlite(dir);
    const legacy = await readFile(new URL('./schema.sql',import.meta.url),'utf8');
    for (const sql of legacy.split(';').filter(x=>x.trim())) await db.query(sql);
    await db.query("INSERT INTO accounts VALUES ('a','Owner','legacy@example.com','not-a-login')");
    await db.query("INSERT INTO properties VALUES ('p','a','Yard','Address')");
    await db.query("INSERT INTO rooms VALUES ('r','a','p','Room')");
    await db.query("INSERT INTO tenancies VALUES ('t','a','r','Renter','',150000,1,'2026-01')");
    await db.query("INSERT INTO charges VALUES ('c','a','t','2026-01',150000)");
    await db.query("INSERT INTO payments(id,owner,tenancy_id,amount,method,paid_on,reference) VALUES ('pay','a','t',100000,'Cash','2026-01-10','Rent')");
    await db.close(); db = await database(null,dir);
    assert.equal((await db.query("SELECT start_on::text FROM tenancies WHERE id='t'")).rows[0].start_on,'2026-01-01');
    assert.equal((await db.query('SELECT count(*)::int AS n FROM schema_migrations')).rows[0].n,1);
    assert.equal((await db.query("SELECT start_date_estimated FROM tenancies WHERE id='t'")).rows[0].start_date_estimated,true);
    await db.close(); db = await database(null,dir);
    assert.equal((await db.query('SELECT count(*)::int AS n FROM schema_migrations')).rows[0].n,1);
    const amounts = (await db.query('SELECT (SELECT sum(amount) FROM charges) - (SELECT sum(amount) FROM payments) AS balance')).rows[0];
    assert.equal(Number(amounts.balance),50000);
    await db.query("UPDATE tenancies SET end_on='2026-01-31',ended_at=now(),end_reason='Moved' WHERE id='t'");
    await db.query("INSERT INTO tenancies(id,owner,room_id,name,phone,rent,due_day,start_month,start_on) VALUES ('new','a','r','New renter','',150000,1,'2026-02','2026-02-01')");
    assert.equal((await db.query('SELECT count(*)::int AS n FROM tenancies')).rows[0].n,2);
  } finally {
    if (db) await db.close();
    // Remove only the newly-created test directory within the expected temporary root.
    const resolved = path.resolve(dir);
    if (path.dirname(resolved)!==path.resolve(tmpdir()) || !path.basename(resolved).startsWith('kasirent-migration-')) throw Error('Unexpected cleanup path');
    await rm(resolved,{recursive:true,force:true});
  }
});
