import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getIdbyPost = async (req, res) => {
  const { interest } = req.body;
  const interestName = interest.map((obj) => (obj.name));
  const interestSelected = await prisma.interest.findMany({
    where: {
      name: { in: interestName },
    },
  });
  const interestId = await interestSelected.map((obj) => ({ id: obj.id }));
  if (interestId) {
    res.json({
      status: {
        code: 200,
        message: 'interestId query completed',
      },
      interestId,
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'interestId query incompleted',
      },
    });
  }
};
export default getIdbyPost;
