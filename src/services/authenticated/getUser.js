import { config } from 'dotenv';

config();

const getUser = (req, res) => {
  if (!req.user) {
    return res.json({
      status: {
        code: 401,
        message: 'You are not authorized to access this resource',
      },
    });
  }
  return res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    user: req.user,
  });
};

export default getUser;
