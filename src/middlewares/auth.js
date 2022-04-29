import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(' ');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          status: {
            code: 401,
            message: 'Invalid token',
          },
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: {
        code: 401,
        message: 'No token provided',
      },
    });
  }
};

export default auth;
