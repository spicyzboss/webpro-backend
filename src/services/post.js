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
  const interestList = [];
  for (let i = 0; i < interest.length; i += 1) {
    interestList.push({ post_id: post.id, interest_id: interest[i].id });
  }

  const postInterestCreate = await prisma.postInterest.createMany({
    data: interestList,
  });

  const relatePostInterest = await prisma.postInterest.findMany({
    where: { post_id: post.id },
  });

  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      PostInterest: relatePostInterest,
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
