import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getProfileMember = async (req, res) => {
    const { id, friend } = req.body
    const filterFriend = friend.map(obj => obj.id)
    console.log(filterFriend)
    const memberMember = await prisma.memberMember.findMany({
        where: {
            member_id: id,
            friend_id: { in: filterFriend },
        }
    }
    );
    const filterId = memberMember.map(obj => ({ id: obj.friend_id }))
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

