import { PrismaClient } from '@prisma/client';
import { isValidMd5 } from '../utils';

const prisma = new PrismaClient();

const editProfile = async (req, res) => {
  const {
    firstname, lastname, gender, birth_date: birthDate, password,
  } = req.body;

  if (!isValidMd5(password)) {
    res.json({
      status: {
        code: 400,
        message: 'Password not safe',
      },
    });
  } else {
    const user = await prisma.user.update({
      where: { id: 5 },
      data: {
        password,
        Member: {
          update: {
            firstname,
            lastname,
            gender,
            birth_date: birthDate,
          },
        },
      },
    });
    if (user) {
      res.json({
        status: {
          code: 200,
          message: 'Profile updated',
        },
      });
    } else {
      res.json({
        status: {
          code: 400,
          message: 'Profile can\'t update',
        },
      });
    }
  }
};
export default editProfile;
