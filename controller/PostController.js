import prisma from "../DB/db.config.js";

// get data
export const fetchPosts = async(req, res) =>{
    // fetch post with comment
    const posts = await prisma.post.findMany({})
    return res.json({status:200, data:posts})
}

// show single post
export const showPost = async(req,res) =>{
    const postId = req.params.id
    const post = await prisma.post.findFirst({
        where:{
            id:Number(postId)
        }
    })
    return res.json({status:200, data:post})
}
// create post
 export const createPost = async(req,res)=>{
    const {user_id , title, description} = req.body
    const newPost = await prisma.post.create({
        data:{
           user_id : Number(user_id),
           title,
           description
        }
    })
    return res.json({status:200, data:newPost, msg:"Post created created"})
 }

//  update the post
export const updatepost = async(req,res) =>{
    const postId = req.params.id;
    const {title, description} = req.body;
    await prisma.post.update({
        where:{
            id: Number(postId)
        },
        data:{
            title,
            description
        }
    })
    return res.json({status:200, message:"post updated successfully"})
}
 // Delete post
 export const deletepost = async(req, res) =>{
        const postId = req.params.id;
        await prisma.post.deleteMany({
            where:{
                id:Number(postId)
            }
        })
        return res.json({status:200, message:"post deleted successfully"})
 }