import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getPostData = async (req, res) => {
    const post = await prisma.post.findMany()
    const postx = post.map(each => ({
        id: each.id,
        post_by: each.post_by,
        created_at: each.created_at.toLocaleString('en-US'),
        finish_at: each.finish_at.toLocaleDateString(),
        content: each.content,
    }));
    const postby = post.map(obj => ({ id: obj.post_by }))
    console.log(postx)
    if (postx) {
        res.json({
            status: {
                code: 200,
                message: 'query interest is completed',
            },
            postx,
            post,
            postby,
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
export default getPostData