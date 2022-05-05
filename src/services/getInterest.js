import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getInterest = async (req, res) => {
  const interest = await prisma.interest.findMany();
  const interestName = interest.map((obj) => ({ name: obj.name }));
  if (interest) {
    res.json({
      status: {
        code: 200,
        message: 'query interest is completed',
      },
      interestName,
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'query interest is incompleted',
      },
    });
  }
};
export default getInterest;
