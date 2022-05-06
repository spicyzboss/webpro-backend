import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reportUser = async (req, res) => {
  const { content, report_from: reportFrom, report_to: reportTo } = req.body;
  const report = await prisma.report.create({
    data: {
      content,
      report_from: reportFrom,
      report_to: reportTo,
    },
  });
  if (report) {
    res.json({
      status: {
        message: 'report successfully',
      },
    });
  } else {
    res.json({
      status: {
        code: 401,
        message: 'report is invalid',
      },
    });
  }
};
const addToBlacklists = async (req, res) => {
  const { member_id: rpID, reason } = req.body;
  const userBaned = await prisma.blacklist.create({
    data: {
      reason,
      member_id: rpID,
    },
  });
  if (userBaned) {
    res.json({
      status: {
        message: 'ban successfully',
      },
    });
  } else {
    res.json({
      status: {
        code: 401,
        message: 'ban is invalid',
      },
    });
  }
};

const removeBlacklist = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const user = await prisma.blacklist.delete({
    where: {
      id,
    },
  });
  if (user) {
    res.json({
      status: {
        code: 200,
        message: 'remove successfully',
      },
      user,
    });
  } else {
    res.json({
      status: {
        code: 404,
        message: 'blacklist not found',
      },
      user,
    });
  }
};

export { reportUser, addToBlacklists, removeBlacklist };
