import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chat = async (req, res) => {
  const { id } = req.user;
  const { to, content } = req.body;

  if (to && content && id) {
    const chatRequest = await prisma.chat.create({
      data: {
        from: id,
        to,
        content,
      },
    });

    res.json({
      status: {
        code: 200,
        message: 'Message sent',
      },
      chat: chatRequest,
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'Message not send',
      },
      chat: {},
    });
  }
};

export default chat;
