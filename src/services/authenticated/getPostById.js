import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPostById = async (req, res) => {
  let { id } = req.params;

  id = Number(id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    res.json({
      status: {
        code: 404,
        message: 'Post not found',
      },
    });
  } else {
    res.json({
      status: {
        code: 200,
        message: 'Success',
      },
      post,
    });
  }
};

export default getPostById;
