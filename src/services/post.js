import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const postCreate = async (req, res) => {
  const {
    content, finish_at: finishAt,
  } = req.body;

  const post = await prisma.post.create({
    data: {
      content,
      finish_at: finishAt,
      member: 0,
    },
  });
};
