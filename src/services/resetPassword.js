import { PrismaClient } from '@prisma/client';
import { isValidMd5, mailSender } from '../utils';

const prisma = new PrismaClient();
const resetPassword = async (req, res) => {
    const {
      password,
    } = req.body;
  
    if (!isValidMd5(password)) {
      res.json({
        status: {
          code: 400,
          message: 'Password not safe',
        },
      });
    } else {
  
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
      };
  
  export default register;