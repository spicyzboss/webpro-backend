import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const groupChat = async (req, res) => {
  const { id } = req.user;
  const { content, post_id: postID } = req.body;

  if (content && id && postID) {
    const chatRequest = await prisma.groupChat.create({
      data: {
        from: id,
        post_id: postID,
        content,
      },
    });

    res.json({
      status: {
        code: 200,
        message: 'Message sent',
      },
      chat: chatRequest,
    });
  } else {
    res.json({
      status: {
        code: 400,
        message: 'Message not send',
      },
      chat: {},
    });
  }
};

export default groupChat;
