import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

config();

const verifyPayment = async (req, res) => {
  const { transRef } = req.body;

  if (transRef) {
    try {
      const authRequest = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token', {
        applicationKey: process.env.PAYMENT_KEY,
        applicationSecret: process.env.PAYMENT_SECRET,
      }, {
        headers: {
          'Content-Type': 'application/json',
          resourceOwnerId: process.env.PAYMENT_KEY,
          requestUId: randomUUID(),
          'accept-language': 'EN',
        },
      });
      const { accessToken } = authRequest.data.data;

      const verifyRequest = await axios.get(`https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/${transRef}?sendingBank=014`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          resourceOwnerId: process.env.PAYMENT_KEY,
          requestUId: randomUUID(),
          'accept-language': 'EN',
        },
      });

      if (verifyRequest.data.status.code === 1000 && req.user.id === Number(verifyRequest.data.data.ref1)) {
        const premium = await prisma.premium.create({
          data: {
            member_id: req.user.id,
          },
        });

        res.json({
          status: {
            code: 200,
            message: 'Payment verified',
          },
          user: premium,
          payment: verifyRequest.data.data,
        });
      } else {
        res.json({
          status: {
            code: 404,
            message: 'Payment not found',
          },
        });
      }
    } catch (e) {
      res.json({
        status: {
          code: 500,
          message: 'Payment server error',
        },
      });
    }
  } else {
    res.json({
      status: {
        code: 400,
        message: 'Transaction reference is required',
      },
    });
  }
};

export default verifyPayment;
