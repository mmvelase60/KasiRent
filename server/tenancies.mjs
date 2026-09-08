import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { transaction } from './transaction.mjs';

const text = z.string().trim().min(1).max(200);
export const businessDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => {
  const d = new Date(s);
  return s >= '1900-01-01' && !isNaN(+d) && d.toISOString().slice(0, 10) === s && s <= businessDate();
}, 'Enter a real date from 1900 through today. Future moves are not supported.');
const asDate = v => v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
function fail(status, message) { const e = new Error(message); e.status = status; throw e; }

export function tenancyRoutes(api, db) {
  api.post('/tenancies', async (req, res) => {
    const input = z.object({ room_id: text, name: text, phone: z.string().trim().max(30), rent: z.number().int().positive().max(100000000), due_day: z.number().int().min(1).max(28), start_on: day.optional(), start_month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional() }).parse(req.body);
    const start = day.parse(input.start_on ?? (input.start_month ? input.start_month + '-01' : undefined));
    if (input.start_month && input.start_month !== start.slice(0, 7)) fail(400, 'Move-in date and first rental month must agree.');
    const tenancy = await transaction(db, async tx => {
      const room = (await tx.query('SELECT id FROM rooms WHERE id=$1 AND owner=$2 FOR UPDATE', [input.room_id, req.owner])).rows[0];
      if (!room) fail(404, 'Room not found.');
      const overlap = (await tx.query('SELECT id FROM tenancies WHERE room_id=$1 AND (end_on IS NULL OR end_on >= $2::date)', [room.id, start])).rows[0];
      if (overlap) fail(409, 'This move-in overlaps an existing tenancy. End the current tenancy and use a date after its last occupied day.');
      return (await tx.query('INSERT INTO tenancies (id,owner,room_id,name,phone,rent,due_day,start_month,start_on,start_date_estimated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [randomUUID(),req.owner,room.id,input.name,input.phone,input.rent,input.due_day,start.slice(0,7),start,!input.start_on])).rows[0];
    });
    res.json(tenancy);
  });

  api.post('/tenancies/:id/end', async (req, res) => {
    const input = z.object({ end_on: day, reason: text }).parse(req.body);
    const result = await transaction(db, async tx => {
      const original = (await tx.query('SELECT room_id FROM tenancies WHERE id=$1 AND owner=$2', [req.params.id,req.owner])).rows[0];
      if (!original) fail(404, 'Tenancy not found.');
      await tx.query('SELECT id FROM rooms WHERE id=$1 AND owner=$2 FOR UPDATE', [original.room_id,req.owner]);
      const t = (await tx.query('SELECT * FROM tenancies WHERE id=$1 AND owner=$2', [req.params.id,req.owner])).rows[0];
      if (t.end_on) {
        if (asDate(t.end_on) === input.end_on && t.end_reason === input.reason) return t;
        fail(409, 'This tenancy has already ended. Its move-out record cannot be overwritten.');
      }
      if (input.end_on < asDate(t.start_on)) fail(400, 'Move-out cannot be before move-in.');
      const laterCharge = (await tx.query('SELECT id FROM charges WHERE tenancy_id=$1 AND month>$2 LIMIT 1', [t.id,input.end_on.slice(0,7)])).rows[0];
      if (laterCharge) fail(409, 'Rent has already been charged after this move-out month. Review those charges before ending the tenancy; no history has been changed.');
      return (await tx.query('UPDATE tenancies SET end_on=$1,ended_at=now(),end_reason=$2 WHERE id=$3 AND owner=$4 RETURNING *', [input.end_on,input.reason,t.id,req.owner])).rows[0];
    });
    res.json(result);
  });

  api.post('/charges', async (req, res) => {
    const { month } = z.object({ month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/) }).parse(req.body);
    if (month > businessDate().slice(0,7)) fail(400, 'Future rent cannot be charged yet.');
    await transaction(db, async tx => {
      // Same lock order as move-in/out keeps charging and occupancy changes consistent.
      await tx.query('SELECT id FROM rooms WHERE owner=$1 ORDER BY id FOR UPDATE', [req.owner]);
      const tenants = (await tx.query("SELECT * FROM tenancies WHERE owner=$1 AND start_month<=$2 AND (end_on IS NULL OR to_char(end_on,'YYYY-MM') >= $2)", [req.owner,month])).rows;
      for (const t of tenants) await tx.query('INSERT INTO charges VALUES ($1,$2,$3,$4,$5) ON CONFLICT (tenancy_id,month) DO NOTHING', [randomUUID(),req.owner,t.id,month,t.rent]);
    });
    res.json({ok:true});
  });
}
