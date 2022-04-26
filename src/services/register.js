import { PrismaClient } from '@prisma/client';
import isValidMd5 from '../utils/isValidMd5';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const {
    firstname, lastname, gender, age, email, password,
  } = req.body;

  if (!isValidMd5(password)) {
    res.status(400).json({
      status: {
        message: 'Password not safe',
      },
      user: {},
    });
  } else {
    /** @type {import('@prisma/client').User} */
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
          Member: {
            create: {
              firstname,
              lastname,
              gender,
              age,
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

      res.json({
        status: {
          message: 'Login Successfully',
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
    } catch (err) {
      res.status(500).json({
        status: {
          message: 'Database Server Error',
        },
        user: {},
      });
    }
  }
};

export default register;
