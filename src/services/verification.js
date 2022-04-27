import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mailVerification = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(404).json({
      status: {
        code: 404,
        message: 'Token not found',
      },
    });
  }

  /** @type {import('@prisma/client').VerificationSession} */
  const checkedToken = await prisma.verificationSession.findFirst({
    where: {
      token,
    },
  });

  if (checkedToken && new Date(checkedToken.expired_at).getTime() > Date.now()) {
    await prisma.user.update({
      data: {
        isVerified: true,
      },
      where: {
        id: checkedToken.member_id,
      },
    });

    res.json({
      status: {
        code: 200,
        message: 'Verify successfully',
      },
    });
  } else {
    res.status(404).json({
      status: {
        code: 404,
        message: 'Session not found',
      },
    });
  }
};

export default mailVerification;
