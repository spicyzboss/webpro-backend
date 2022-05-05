import 'core-js/stable';
import 'regenerator-runtime/runtime';

import clc from 'cli-color';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import app from './app';

const prisma = new PrismaClient();

config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  process.stdout.write(`Started on port ${clc.yellow(PORT)}\n`);
});

io.on('connection', (socket) => {
  socket.on('chat', async (data) => {
    io.sockets.emit('chat', data);
    await prisma.chat.create({ data: data.chat });
  });

  socket.on('groupChat', async (data) => {
    io.sockets.emit('groupChat', data);
    await prisma.groupChat.create({ data: data.groupChat });
    // data: {
    //   from: id,
    //   post_id: postID,
    //   content,
    // },
  });
});
