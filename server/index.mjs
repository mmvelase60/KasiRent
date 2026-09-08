import { database } from './db.mjs';
import { app } from './app.mjs';
const db=await database();
app(db).listen(process.env.PORT||3001,'0.0.0.0',()=>console.log(`KasiRent API ready on port ${process.env.PORT||3001} (${process.env.DATABASE_URL?'PostgreSQL':'local embedded PostgreSQL'})`));
