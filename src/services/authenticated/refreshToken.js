import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

config();

const refreshToken = async (req, res) => {
  try {
    /** @type {import('@prisma/client').User} */
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    /** @type {import('@prisma/client').Member} */
    const member = await prisma.member.findUnique({
      where: {
        id: user.id,
      },
      select: {
        firstname: true,
        lastname: true,
        birth_date: true,
        gender: true,
        Premium: {
          select: {
            since: true,
            member_id: true,
          },
        },
      },
    });

    const userData = {
      id: user.id,
      firstname: member.firstname,
      lastname: member.lastname,
      age: new Date().getFullYear() - member.birth_date.getFullYear(),
      profile_image: user.profile_image,
      gender: member.gender,
      email: user.email,
      isVerified: user.isVerified,
      premium: Boolean(member.Premium),
      premium_since: member.Premium ? member.Premium.since : '',
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);

    res.json({
      status: {
        code: 200,
        message: 'Refresh successfully',
      },
      token,
    });
  } catch (err) {
    res.json({
      status: {
        code: 500,
        message: 'Database server error',
      },
      token: '',
    });
  }
};

export default refreshToken;
