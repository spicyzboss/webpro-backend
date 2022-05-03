import { config } from 'dotenv';
import axios from 'axios';
import { randomUUID } from 'crypto';

config();

const payment = async (req, res) => {
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

    const paymentRequest = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create', {
      qrType: 'PP',
      ppType: 'BILLERID',
      ppId: process.env.PAYMENT_ID,
      amount: 149,
      ref1: `${req.user.id}`,
      ref2: 'PREMIUM',
      ref3: 'PATTY',
    }, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        resourceOwnerId: process.env.PAYMENT_KEY,
        requestUId: randomUUID(),
        'accept-language': 'EN',
      },
    });

    res.json({
      status: {
        code: 200,
        message: 'Payment request success',
      },
      image: paymentRequest.data.data.qrImage,
    });
  } catch (e) {
    res.json({
      status: {
        code: 500,
        message: 'Payment server error',
      },
    });
  }
};

export default payment;
