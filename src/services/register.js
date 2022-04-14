import { PrismaClient } from '@prisma/client';
import isValidMd5 from '../utils/isValidMd5';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!isValidMd5(password)) {
    res.status(400).json({
      message: 'Password not safe',
    });
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    if (user) {
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(500).json({
        message: 'Database Server Error',
      });
    }
  }
};

export default register;
