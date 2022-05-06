import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getGroupChat = async (req, res) => {
  const chat = await prisma.groupChat.findMany({
    where: {
      post_id: Number(req.params.id),
    },
  });

  if (!chat) {
    res.json({
      status: {
        code: 404,
        message: 'Not found chat',
      },
      chat,
    });
  } else {
    res.json({
      status: {
        code: 200,
        message: 'Success',
      },
      chat,
    });
  }
};

export default getGroupChat;
