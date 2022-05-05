import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addFriend = async (req, res) => {
  const { userid, id } = req.body;
  const memberMember = await prisma.memberMember.create({
    data: {
      member_id: userid,
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
