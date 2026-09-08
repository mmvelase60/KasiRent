import { readFile, mkdir } from 'node:fs/promises';
import { transaction } from './transaction.mjs';
export async function database(url = process.env.DATABASE_URL, path = './data/postgres') {
  let db;
  if (url) { const { Pool, types } = await import('pg'); types.setTypeParser(1082, value => value); db = new Pool({ connectionString: url }); }
  else { const { PGlite } = await import('@electric-sql/pglite'); if (!path.startsWith('memory:')) await mkdir(path, {recursive:true}); db = new PGlite(path); }
  // Execute statements individually for both PostgreSQL drivers.
  const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');
  for (const statement of sql.split(';').filter(s => s.trim())) await db.query(statement);
  await db.query('CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
  await transaction(db, async tx => {
    await tx.query('LOCK TABLE schema_migrations IN EXCLUSIVE MODE');
    for (const version of ['001-tenancy-lifecycle', '002-rent-changes']) {
    if (!(await tx.query('SELECT version FROM schema_migrations WHERE version=$1', [version])).rows.length) {
      const migration = await readFile(new URL('./migrations/' + version + '.sql', import.meta.url), 'utf8');
      for (const statement of migration.split(';').filter(s => s.trim())) await tx.query(statement);
      await tx.query('INSERT INTO schema_migrations(version) VALUES ($1)', [version]);
    }
    }
  });
  return db;
}
