import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import generateToken from './generateToken';

config();

const prisma = new PrismaClient();

/**
 * @param id        {Number}
 * @param receiver  {String}
 */
async function mailSender(id, receiver) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_SENDER_USER,
      pass: process.env.MAIL_SENDER_PASS,
    },
  });

  const expire = new Date();
  expire.setMinutes(expire.getMinutes() + 10);

  const session = await prisma.verificationSession.create({
    data: {
      member_id: id,
      token: generateToken(),
      expired_at: expire,
    },
  });

  const tokenLink = `${process.env.HOST}${process.env.PORT ? `:${process.env.PORT}` : ''}/verify?token=${session.token}`;

  try {
    await transporter.sendMail({
      from: `"Patty 🍔" <${process.env.MAIL_SENDER_USER}>`,
      to: receiver,
      subject: 'Patty Verification',
      text: 'Welcome! Thank you for register Patty.',
      html: `
<!DOCTYPE html>
<html>

<head>
  <title>Patty</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    body,
    table,
    td,
    a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    table {
      border-collapse: collapse !important;
    }

    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      font-family: 'Inter', sans-serif;
      background: #f4f4f4;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    @media screen and (max-width:600px) {
      h1 {
        font-size: 32px !important;
        line-height: 32px !important;
      }
    }
  </style>
</head>

<body>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td bgcolor="#ff9780" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 10px;"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#ff9780" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td bgcolor="#ffffff" align="center" valign="top"
              style="padding: 40px 20px 20px 20px; border-radius: 24px 24px 0px 0px; color: #111111; font-size: 48px; line-height: 48px;">
              <p style="font-size: 48px; font-weight: 700; margin: 2;">Welcome!</p> <img
                src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"
                style="display: block; border: 0px;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td bgcolor="#ffffff" align="center"
              style="padding: 20px 30px 40px 30px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;">
              <p style="margin: 0;">Thank you for register Patty.</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="#ff9780"><a href="${tokenLink}" target="_blank"
                            style="font-size: 20px; color: #ffffff; text-decoration: none; color: #ffffff; padding: 15px 25px; display: inline-block;">Confirm
                            Account</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="center"
              style="padding: 0px 30px 0px 30px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="center"
              style="padding: 20px 30px 20px 30px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px; border-radius: 0px 0px 24px 24px;">
              <p style="margin: 0;"><a href="#" target="_blank" style="color: #ff9780;">${tokenLink}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <h2></h2>
      </td>
    </tr>
  </table>
</body>

</html>`,
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
  }
}

export default mailSender;
