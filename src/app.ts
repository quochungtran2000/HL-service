import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import cors from 'cors';

import express, { Request, Response } from 'express';
import { dbConfig } from './utils/dbConfig';
import { createConnection } from 'typeorm';
import route from './api/route';
import { swaggerstats } from './middleware';

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const menu = `
<h3><b>Admin</b></h3>
  <ul>
    <li><a href="/api/v1/dashboard">Dashboard</a></li>
  </ul>
<h3><b>Api</b></h3>
<ul>
  <li><a href="/api/v1/city">City</a></li>
  <li><a href="/api/v1/district">District</a></li>
  <li><a href="/api/v1/ward">Ward</a></li>
</ul>
`;

app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to api \n ${menu}`);
});

app.use(cors());
app.use(swaggerstats);
app.use('/api/v1', route);

createConnection(dbConfig)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`app listen on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
