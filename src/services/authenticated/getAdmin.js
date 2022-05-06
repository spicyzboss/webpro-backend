import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAdmin = async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!admin) {
    res.json({
      status: {
        code: 401,
        message: 'Not have permission',
      },
    });
  } else {
    res.json({
      status: {
        code: 200,
        message: 'Welcome',
      },
      admin,
    });
  }
};

export default getAdmin;
