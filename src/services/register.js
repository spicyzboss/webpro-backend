import { PrismaClient } from '@prisma/client';
import { isValidMd5, mailSender } from '../utils';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const {
    firstname, lastname, gender, birth_date: birthDate, email, password,
  } = req.body;

  if (!isValidMd5(password)) {
    res.json({
      status: {
        code: 400,
        message: 'Password not safe',
      },
      user: {},
    });
  } else {
    /** @type {import('@prisma/client').User} */
    try {
      const usedEmail = await prisma.user.findFirst({
        where: { email },
      });

      if (usedEmail) {
        res.json({
          status: {
            code: 401,
            message: 'This email is already in use.',
          },
          user: {},
        });
      } else {
        const user = await prisma.user.create({
          data: {
            email,
            password,
            Member: {
              create: {
                firstname,
                lastname,
                gender,
                birth_date: birthDate,
              },
            },
          },
        });

        /** @type {import('@prisma/client').Member} */
        const member = await prisma.member.findUnique({
          where: {
            id: user.id,
          },
        });

        await mailSender(member.id, user.email);

        res.json({
          status: {
            code: 200,
            message: 'Register Successfully',
          },
          user: {
            id: user.id,
            firstname: member.firstname,
            lastname: member.lastname,
            age: member.age,
            gender: member.gender,
            email: user.email,
          },
        });
      }
    } catch (err) {
      res.json({
        status: {
          code: 500,
          message: 'Database server error',
        },
        user: {},
      });
    }
  }
};

export default register;
