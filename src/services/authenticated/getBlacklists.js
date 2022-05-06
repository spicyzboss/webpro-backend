import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getBlacklists = async (req, res) => {
  const blacklists = await prisma.blacklist.findMany();

  res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    blacklists,
  });
};

export default getBlacklists;
