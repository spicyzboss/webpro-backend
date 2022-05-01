import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createPost = async (req, res) => {
  const {
    content, post_by: postBy, finish_at: finishAt, interest,
  } = req.body;
  const postList = [];
  for (let i = 0; i < interest.length; i += 1) {
    postList.push({
      content,
      post_by: postBy,
      finish_at: finishAt,
      interest_id: interest[i].id,
    });
  }
  const post = await prisma.post.createMany({
    data: postList,
    skipDuplicates: true,
  });
  const interestList = [];
  for (let i = 0; i < interest.length; i += 1) {
    interestList.push({ post_id: post.id, interest_id: interest[i].id });
  }

  await prisma.postInterest.createMany({
    data: interestList,
    skipDuplicates: true,
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
