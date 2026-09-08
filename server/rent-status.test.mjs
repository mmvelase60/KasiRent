import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rentStatus } from '../mobile/src/rentStatus.mjs';
const tenant={id:'t',start_month:'2025-12'};
const charges=months=>months.map(month=>({tenancy_id:'t',month}));
test('missing rent overrides zero and credit balances and detects historical gaps',()=>{
 for(const balance of [0,-10000,50000])assert.deepEqual(rentStatus(tenant,charges(['2026-02']),[],balance,'2026-02'),{missing:['2025-12','2026-01'],label:'Not charged'});
 for(const [balance,label] of [[0,'Settled'],[100,'Rent due'],[-100,'Credit']])assert.equal(rentStatus(tenant,charges(['2025-12','2026-01','2026-02']),[],balance,'2026-02').label,label);
});
test('occupancy and opening cutoffs include final month and exclude future months',()=>{
 const former={...tenant,end_on:'2026-01-15'};
 assert.deepEqual(rentStatus(former,[],[],0,'2026-02').missing,['2025-12','2026-01']);
 const opening={tenancy_id:'t',as_on:'2026-01-01'};
 assert.deepEqual(rentStatus(tenant,[],[opening],0,'2026-02').missing,['2026-01','2026-02']);
 assert.deepEqual(rentStatus(tenant,[],[{...opening,voided_at:'2026-02-01'}],0,'2026-02').missing,['2025-12','2026-01','2026-02']);
 assert.deepEqual(rentStatus({...tenant,start_month:'2026-03'},[],[],0,'2026-02'),{missing:[],label:'No rent expected'});
 assert.deepEqual(rentStatus(tenant,[{tenancy_id:'other',month:'2025-12'}],[{tenancy_id:'other',as_on:'2026-02-01'}],0,'2025-12').missing,['2025-12']);
});
test('posting the missing month removes its alert without assigning payments to months',()=>{
 const t={id:'t',start_month:'2026-02',start_on:'2026-02-15'};
 assert.equal(rentStatus(t,[],[],0,'2026-02').label,'Not charged');
 assert.equal(rentStatus(t,charges(['2026-02']),[],150000,'2026-02').label,'Rent due');
 assert.equal(rentStatus(t,charges(['2026-02']),[],0,'2026-02').label,'Settled');
});
