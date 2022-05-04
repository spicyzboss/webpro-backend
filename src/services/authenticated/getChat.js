import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getChat = async (req, res) => {
  const chat = await prisma.chat.findMany({
    where: {
      from: req.user.id,
    },
  });

  res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    chat,
  });
};

export default getChat;
