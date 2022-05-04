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
  // console.log(Array.isArray(interest));
  const PIList = interest.map((each) => (
    {
      post_id: post.id,
      interest_id: each.id,
    }
  ));
  const postInterest = await prisma.postInterest.createMany({
    data: PIList,
  });
  // console.log(postInterest);
  if (post && postInterest) {
    res.json({
      status: {
        code: 200,
        message: 'Post was created',
      },
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'Can\'t create post',
      },
    });
  }
};

const findPost = async (req, res) => {
  const { interest } = req.body;
  const interestName = interest.map((obj) => obj.name);
  const interestitem = await prisma.interest.findMany({
    where: {
      name: { in: interestName },
    },
  });
  const selectedInterestID = interestitem.map((its) => its.id);
  const postWhereInterest = await prisma.postInterest.findMany({
    where: {
      interest_id: { in: selectedInterestID },
    },
  });

  // console.log(selectedInterestID, postWhereInterest);
  if (postWhereInterest) {
    res.json({
      status: {
        message: 'Query success',
      },
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
