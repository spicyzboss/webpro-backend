import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createPost = async (req, res) => {
  const {
    content, post_by: postBy, finish_at: finishAt, interest,
  } = req.body;

  const post = await prisma.post.create({
    data: {
      content,
      post_by: postBy,
      finish_at: finishAt,
    },
  });

  const postByID = await prisma.post.findUnique({
    where: {
      id: post.id,
    },
  });

  const interestByID = await prisma.interest.findUnique({
    where: {
      id: interest.id,
    },
  });

  const postInterest = await prisma.postInterest.create({
    data: {
      post: {
        connect: {
          id: postByID.id,
        },
      },
      interest: {
        connect: {
          id: interestByID.id,
        },
      },
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
