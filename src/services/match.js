import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addFriend = async (req, res) => {
  const { id } = req.body;
  const memberMember = await prisma.memberMember.create({
    data: {
      member_id: 4,
      friend_id: id,
    },
  });
  if (memberMember) {
    res.json({
      status: {
        code: 200,
        message: 'add friend is done',
      },
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'add friend is not done',
      },
    });
  }
};

export default addFriend;
