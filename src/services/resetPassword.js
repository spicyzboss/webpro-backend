import { PrismaClient } from '@prisma/client';
import { isValidMd5 } from '../utils';

const prisma = new PrismaClient();

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    res.json({
      status: {
        code: 400,
        message: 'password is required',
      },
    });
  }

  if (!isValidMd5(newPassword)) {
    res.json({
      status: {
        code: 400,
        message: 'Password not safe',
      },
    });
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: newPassword,
      },
    });

    if (user) {
      res.json({
        status: {
          code: 200,
          message: 'Password reset successfully',
        },
      });
    } else {
      res.json({
        status: {
          code: 500,
          message: 'Database server error',
        },
      });
    }
  } catch (err) {
    res.json({
      status: {
        code: 500,
        message: 'Database server error',
      },
    });
  }
};

export default resetPassword;
