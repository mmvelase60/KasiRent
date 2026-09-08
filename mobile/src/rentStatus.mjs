// Payment records are not allocated to individual months: status describes the whole ledger.
export function rentStatus(tenant, charges, openings, balance, currentMonth) {
  const opening = openings.find(o => o.tenancy_id === tenant.id && !o.voided_at);
  const first = opening ? [tenant.start_month, String(opening.as_on).slice(0,7)].sort().at(-1) : tenant.start_month;
  const last = tenant.end_on ? [String(tenant.end_on).slice(0,7), currentMonth].sort()[0] : currentMonth;
  const charged = new Set(charges.filter(c => c.tenancy_id === tenant.id).map(c => c.month));
  const missing = [];
  for (let month = first; month <= last;) {
    if (!charged.has(month)) missing.push(month);
    const [year, number] = month.split('-').map(Number);
    month = number === 12 ? String(year + 1).padStart(4,'0') + '-01' : String(year).padStart(4,'0') + '-' + String(number + 1).padStart(2,'0');
  }
  return { missing, label: missing.length ? 'Not charged' : balance > 0 ? 'Rent due' : balance < 0 ? 'Credit' : charged.size || opening ? 'Settled' : 'No rent expected' };
}
