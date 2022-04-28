import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    res.json({
      status: {
        code: 200,
        message: 'Login successfully',
      },
      user: {
        id: user.id,
        firstname: member.firstname,
        lastname: member.lastname,
        age: member.age,
        gender: member.gender,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    if (err instanceof TypeError) {
      res.json({
        status: {
          code: '401',
          message: 'Invalid email or password',
        },
        user: {},
      });
    } else {
      res.json({
        status: {
          code: '500',
          message: 'Database server error',
        },
        user: {},
      });
    }
  }
};

export default login;
