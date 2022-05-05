import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getProfileById = async (req, res) => {
    const { post } = req.body;
    const postbyId = post.map((obj) => obj.id);
    const user = await prisma.user.findMany({
        where: {
            id: { in: postbyId },
        },
    });
    const member = await prisma.member.findMany({
        where: {
            id: { in: postbyId },
        },
    });
    const userPic = await user.map((obj) => ({
        id: obj.id,
        profile_image: obj.profile_image,
    }));
    const memberItem = await member.map((obj) => ({
        id: obj.id,
        firstname: obj.firstname,
        lastname: obj.lastname,
    }));
    if (userPic && memberItem) {
        res.json({
            status: {
                code: 200,
                message: 'userPic query completed',
            },
            userPic,
            memberItem,
        });
    } else {
        res.json({
            status: {
                code: 400,
                message: 'userPic query incompleted',
            },
        });
        const userPic = await user.map(obj => ({
            id: obj.id,
            profile_image: obj.profile_image,
        }))
        const memberItem = await member.map(obj => ({
            id: obj.id,
            firstname: obj.firstname,
            lastname: obj.lastname,
            gender: obj.gender
        }))
        console.log(userPic, memberItem)
        if (userPic && memberItem) {
            res.json({
                status: {
                    code: 200,
                    message: 'userPic query completed',
                },
                userPic,
                memberItem
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
};
export default getProfileById
