import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getChat = async (req, res) => {
  const chat = await prisma.chat.findMany({
    where: {
      OR: [
        {
          from: req.user.id,
        },
        {
          to: req.user.id,
        },
      ],
    },
    select: {
      content: true,
      created_at: true,
      from: true,
      to: true,
      id: true,
      target: {
        select: {
          id: true,
          profile_image: true,
          Member: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          profile_image: true,
          Member: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      },
    },
  });

  const chatArray = chat.map((item) => ({
    content: item.content,
    created_at: item.created_at,
    from: item.from,
    to: item.to,
    id: item.id,
  }));

  const userArray = chat.map((item) => {
    if (req.user.id === item.sender.id) {
      return {
        id: item.target.id,
        profile_image: item.target.profile_image,
        firstname: item.target.Member.firstname,
        lastname: item.target.Member.lastname,
      };
    }
    return {
      id: item.sender.id,
      profile_image: item.sender.profile_image,
      firstname: item.sender.Member.firstname,
      lastname: item.sender.Member.lastname,
    };
  });

  res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    chat: chatArray,
    user: [...new Set(userArray.map((v) => JSON.stringify(v)))].map((v) => JSON.parse(v)),
  });
};

export default getChat;
