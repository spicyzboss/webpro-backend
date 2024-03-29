import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const checkEmail = async (req, res) => {
  const { email } = req.body;
  const usedEmail = await prisma.user.findFirst({
    where: { email },
  });
  if (usedEmail) {
    res.json({
      status: {
        code: 400,
        message: 'This email is already in use.',
      },
    });
  } else {
    res.json({
      status: {
        code: 200,
        message: 'You can use this email.',
      },
    });
  }
};

export default checkEmail;
