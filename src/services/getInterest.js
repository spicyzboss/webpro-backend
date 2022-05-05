import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getInterest = async (req, res) => {
    const interest = await prisma.interest.findMany()
    if (interest) {
        res.json({
            status: {
                code: 200,
                message: 'query interest is completed',
            },
            interest: {
                interest_name
            }
        });
    } else {
        res.json({
            status: {
                code: 400,
                message: 'query interest is incompleted',
            },
        });
    }
}
export default getInterest