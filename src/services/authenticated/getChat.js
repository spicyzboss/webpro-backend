import { PrismaClient } from "@prisma/client";

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

  const user = await prisma.memberMember.findMany({
    where: {
      OR: [
        {
          member_id: req.user.id,
        },
        {
          friend_id: req.user.id,
        },
      ],
    },
    select: {
      friend: {
        select: {
          id: true,
          user: {
            select: {
              profile_image: true,
            },
          },
          firstname: true,
          lastname: true,
        },
      },
      member: {
        select: {
          id: true,
          user: {
            select: {
              profile_image: true,
            },
          },
          firstname: true,
          lastname: true,
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

  const userArray = user
    .filter((v) => v.friend.id !== req.user.id || v.member.id !== req.user.id)
    .map((item) => {
      if (item.friend.id === req.user.id) {
        return {
          id: item.member.id,
          profile_image: item.member.user.profile_image,
          firstname: item.member.firstname,
          lastname: item.member.lastname,
        };
      }

      return {
        id: item.friend.id,
        profile_image: item.friend.user.profile_image,
        firstname: item.friend.firstname,
        lastname: item.friend.lastname,
      };
    });

  res.json({
    status: {
      code: 200,
      message: "Success",
    },
    chat: chatArray,
    user: userArray,
  });
};

export default getChat;
