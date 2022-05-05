import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getIntById = async (req, res) => {
    const { member } = req.body
    const memberId = member.map(obj => obj.id)
    const memberInterest = await prisma.memberInterest.findMany({
        where: {
            member_id: { in: memberId }
        }
    })
    const interestId = memberInterest.map(obj => obj.interest_id)
    const memberInterestName = await prisma.interest.findMany({
        where: {
            id: { in: interestId }
        }
    })
    if (memberInterest && memberInterestName) {
        res.json({
            status: {
                code: 200,
                message: 'userPic query completed',
            },
            memberInterest,
            memberInterestName
        });
    } else {
        res.json({
            status: {
                code: 400,
                message: 'userPic query incompleted',
            }
        });
    }
}
export default getIntById