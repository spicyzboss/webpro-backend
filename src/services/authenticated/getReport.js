import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getReport = async (req, res) => {
  const reports = await prisma.report.findMany({
    select: {
      id: true,
      content: true,
      created_at: true,
      reporter: {
        select: {
          email: true,
          profile_image: true,
        },
      },
      report_from: true,
      report_target: {
        select: {
          email: true,
          profile_image: true,
        },
      },
      report_to: true,
    },
  });

  res.json({
    status: {
      code: 200,
      message: 'Success',
    },
    reports,
  });
};

export default getReport;
