import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const addmemberInterest = async (req, res) => {
  const { id, interest } = req.body;
  const interestList = interest.map((obj) => ({
    member_id: id,
    interest_id: obj.id,
  }));
  const memberInterest = await prisma.memberInterest.createMany({
    data: interestList,
  });
  if (interestList && memberInterest) {
    res.json({
      status: {
        code: 200,
        message: 'memberInterest was created',
      },
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'Can\'t create memberInterest',
      },
    });
  }
};
export default addmemberInterest;
