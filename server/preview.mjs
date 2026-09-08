import express from 'express';
import { fileURLToPath } from 'node:url';
const preview=express();
preview.use(express.static(fileURLToPath(new URL('../mobile/dist/',import.meta.url))));
preview.listen(8081,'127.0.0.1',()=>console.log('KasiRent preview: http://localhost:8081'));
