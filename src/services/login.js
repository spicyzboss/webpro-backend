import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (user) {
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
};

export default login;
