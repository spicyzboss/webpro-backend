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

    /** @type {import ('socket.io').Socket} */
    const io = req.app.get('io');
    io.to(postID).emit('groupChat', chatRequest);

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
