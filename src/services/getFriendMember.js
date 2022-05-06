import { PrismaClient } from '@prisma/client';
import { filter } from 'core-js/core/array';

const prisma = new PrismaClient();
const getProfileMember = async (req, res) => {
    const { id, friend } = req.body
    const filterFriend = friend.map(obj => obj.id)
    const memberMember = await prisma.memberMember.findMany({
        where: {
            member_id: id,
            NOT: {
                friend_id: { in: filter }
            }
        }
    })
    const filterId = memberMember.map(obj => obj.friend_id)
    console.log(filterId)
    if (filterId) {
        res.json({
            status: {
                code: 200,
                message: 'memberInterest was created',
            },
            filterId
        });
    } else {
        res.json({
            status: {
                code: 400,
                message: 'Can\'t create memberInterest',
            },
        });
    }
};
export default getProfileMember;

