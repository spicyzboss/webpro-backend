import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    /** @type {import('@prisma/client').User} */
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    /** @type {import('@prisma/client').Member} */
    const member = await prisma.member.findUnique({
      where: {
        id: user.id,
      },
    });

    const userData = {
      id: user.id,
      firstname: member.firstname,
      lastname: member.lastname,
      age: new Date().getFullYear() - member.birth_date.getFullYear(),
      gender: member.gender,
      email: user.email,
      isVerified: user.isVerified,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);

    res.json({
      status: {
        code: 200,
        message: 'Login successfully',
      },
      token,
    });
  } catch (err) {
    if (err instanceof TypeError) {
      res.json({
        status: {
          code: 401,
          message: 'Invalid email or password',
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
  }
};

export default login;
