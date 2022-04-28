import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createPost = async (req, res) => {
  const {
    content, post_by: postBy, finish_at: finishAt,
  } = req.body;
  // เหลือ insertpostinterest
  const post = await prisma.post.create({
    data: {
      content,
      post_by: postBy,
      finish_at: finishAt,
    },
  });
  if (post) {
    res.json({
      status: {
        message: 'Post was created',
      },
    });
  } else {
    res.json({
      status: {
        message: 'Can\'t create post',
      },
    });
  }
};

const findPost = async (req, res) => {
  const { interest } = req.body;
  // interest = JSON.parse(interest);
  const interestName = await prisma.Interest.findMany({
    where: {
      name: interest,
    },
  });
  if (interestName) {
    res.json({
      status: {
        message: 'Query success',
      },
      interestName,
    });
  } else {
    res.json({
      status: {
        message: 'Query failed',
      },
    });
  }
};
export { createPost, findPost };
