import prisma from "../DB/db.config.js";

// get data
export const fetchComments = async(req, res) =>{
    const comments = await prisma.comment.findMany({})
    return res.json({status:200, data:comments})
}

// show single comment
export const showComment = async(req,res) =>{
    const commentId = req.params.id
    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(commentId)
        }
    })
    return res.json({status:200, data:comment})
}
// create comment
 export const createComment = async(req,res)=>{
    const {user_id , post_id , comment} = req.body;
    // increase the comment counter 
    await prisma.post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment: 1
            }
        }
    })
    const newComment = await prisma.comment.create({
        data:{
           user_id : Number(user_id),
           post_id : Number(post_id),
           comment
        }
    })
    return res.json({status:200, data:newComment, msg:"Comment created created"})
 }

//  update the post
export const updateComment = async(req,res) =>{
    const commentId = req.params.id;
    const {comment} = req.body;
    await prisma.comment.update({
        where:{
            id: Number(commentId)
        },
        data:{
            comment
        }
    })
    return res.json({status:200, message:"comment updated successfully"})
}
 // Delete comment
 export const deleteComment = async(req, res) =>{
        const commentId = req.params.id;
         // Decrease the comment counter 
    await prisma.post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                decrement: 1
            }
        }
    })
        await prisma.comment.deleteMany({
            where:{
                id:Number(commentId)
            }
        })
        return res.json({status:200, message:"comment deleted successfully"})
 }



