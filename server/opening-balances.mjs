import { z } from 'zod';
import { transaction } from './transaction.mjs';
import { businessDate } from './tenancies.mjs';

function fail(status, message) { const e = new Error(message); e.status = status; throw e; }
const reason = z.string().trim().min(1).max(200);
export function openingRoutes(api, db) {
  api.post('/tenancies/:id/opening-balance', async (req, res) => {
    const input = z.object({ id: z.string().uuid(), amount: z.number().int().min(-100000000).max(100000000).refine(n => n !== 0), as_on: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-01$/).refine(d => d >= '1900-01-01' && d <= businessDate()), reason }).parse(req.body);
    const result = await transaction(db, async tx => {
      const t = (await tx.query('SELECT * FROM tenancies WHERE id=$1 AND owner=$2', [req.params.id,req.owner])).rows[0];
      if (!t) fail(404, 'Tenant not found.');
      await tx.query('SELECT id FROM rooms WHERE id=$1 FOR UPDATE', [t.room_id]);
      const previous = (await tx.query('SELECT *,as_on::text AS date_text FROM opening_balances WHERE id=$1', [input.id])).rows[0];
      if (previous) {
        if (previous.owner !== req.owner || previous.tenancy_id !== t.id || previous.amount !== input.amount || previous.date_text !== input.as_on || previous.reason !== input.reason) fail(409, 'Opening balance reference already used.');
        const { date_text, ...row } = previous;
        return row;
      }
      if (input.as_on.slice(0,7) < t.start_month) fail(400, 'The first tracked month cannot be before the move-in month.');
      if ((await tx.query('SELECT id FROM opening_balances WHERE tenancy_id=$1 AND voided_at IS NULL', [t.id])).rows.length) fail(409, 'Reverse the existing opening balance before recording a replacement.');
      if ((await tx.query('SELECT id FROM charges WHERE tenancy_id=$1 AND month<$2', [t.id,input.as_on.slice(0,7)])).rows.length || (await tx.query('SELECT id FROM payments WHERE tenancy_id=$1 AND paid_on<$2 AND voided_at IS NULL', [t.id,input.as_on])).rows.length) fail(409, 'Earlier charges or payments already exist. Choose an earlier starting month to avoid counting them twice.');
      return (await tx.query('INSERT INTO opening_balances(id,owner,tenancy_id,amount,as_on,reason) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [input.id,req.owner,t.id,input.amount,input.as_on,input.reason])).rows[0];
    });
    res.json(result);
  });

  api.post('/opening-balances/:id/void', async (req, res) => {
    const input = z.object({ reason }).parse(req.body);
    const result = await transaction(db, async tx => {
      const opening = (await tx.query('SELECT o.*,t.room_id FROM opening_balances o JOIN tenancies t ON t.id=o.tenancy_id WHERE o.id=$1 AND o.owner=$2', [req.params.id,req.owner])).rows[0];
      if (!opening) fail(404, 'Opening balance not found.');
      await tx.query('SELECT id FROM rooms WHERE id=$1 FOR UPDATE', [opening.room_id]);
      const current = (await tx.query('SELECT * FROM opening_balances WHERE id=$1', [opening.id])).rows[0];
      if (current.voided_at) {
        if (current.void_reason !== input.reason) fail(409, 'This opening balance is already reversed.');
        return current;
      }
      return (await tx.query('UPDATE opening_balances SET void_reason=$1,voided_at=now() WHERE id=$2 RETURNING *', [input.reason,opening.id])).rows[0];
    });
    res.json(result);
  });
}
