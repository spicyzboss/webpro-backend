// import pclient from '@prisma/client';
import express from 'express';
import clc from 'cli-color';
import { config } from 'dotenv';

config();

// const { PrismaClient } = pclient;

const PORT = process.env.PORT || 3001;
// const prisma = new PrismaClient();
const app = express();

const listener = app.listen(PORT, () => {
  process.stdout.write(`Started on port ${clc.yellow(listener.address().port)}\n`);
});
