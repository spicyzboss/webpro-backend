import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getUsameInt = async (req, res) => {
    const { id } = req.body
    const interest = await prisma.memberInterest.findMany({
        where: {
            member_id: id
        }
    })
    //console.log(interest)
    const interestId = interest.map(obj => obj.interest_id)
    const UserSameInterest = await prisma.memberInterest.findMany({
        where: {
            interest_id: { in: interestId }
        }
    })
    const ListUser = UserSameInterest.filter(obj => obj.member_id != id).map(each => ({ id: each.member_id }))
    if (ListUser) {
        res.json({
            status: {
                code: 200,
                message: 'query success',
            },
            ListUser
        });
    } else {
        res.json({
            status: {
                code: 400,
                message: 'query failed',
            },
        });
    }
}
export default getUsameInt