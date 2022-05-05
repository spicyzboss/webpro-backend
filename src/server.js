import 'core-js/stable';
import 'regenerator-runtime/runtime';

import clc from 'cli-color';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';

config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  process.stdout.write(`Started on port ${clc.yellow(PORT)}\n`);
});
