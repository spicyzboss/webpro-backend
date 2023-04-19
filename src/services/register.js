import { PrismaClient } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { createReadStream, unlinkSync } from 'fs';
import { config } from 'dotenv';
import { isValidMd5, mailSender, generateToken } from '../utils';

config();

const prisma = new PrismaClient();
const s3 = new S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

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
            code: 400,
            message: 'This email is already in use.',
          },
          user: {},
        });
      } else {
        s3.upload({
          Bucket: process.env.AWS_BUCKET,
          Key: `user_profile/${generateToken()}.jpg`,
          Body: createReadStream(req.file.path),
        }, async (err, data) => {
          if (err) {
            unlinkSync(req.file.path);
            res.json({
              status: {
                code: 500,
                message: 'Database server error',
              },
              user: {},
            });
          } else {
            unlinkSync(req.file.path);
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
                profile_image: data.Location,
              },
            });

            /** @type {import('@prisma/client').Member} */
            const member = await prisma.member.findUnique({
              where: {
                id: user.id,
              },
            });

            // await mailSender(member.id, user.email);

            res.json({
              status: {
                code: 200,
                message: 'Register Successfully',
              },
              user: {
                id: user.id,
                firstname: member.firstname,
                lastname: member.lastname,
                age: new Date().getFullYear() - new Date(member.birth_date).getFullYear(),
                profile_image: user.profile_image,
                gender: member.gender,
                email: user.email,
              },
            });
          }
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
