import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getBlacklists = async (req, res) => {
  const blacklists = await prisma.blacklist.findMany({
    select: {
      id: true,
      reason: true,
      created_at: true,
      member_id: true,
      member: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
    },
  });

  res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    blacklists,
  });
};

export default getBlacklists;
