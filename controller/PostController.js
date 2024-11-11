import prisma from "../DB/db.config.js";

// get data
export const fetchPosts = async(req, res) =>{
    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    if(page <= 0){
        page = 1
    }
    if(limit <= 0 || limit > 100){
        limit = 10
    }
    const skip = (page - 1) * limit
    const posts = await prisma.post.findMany({
        // for pagination
        skip:skip,
        take : limit,
         // fetch post with comment
        // include:{
        //     comment:true,
        // }


        //fetch post with comment specific user 
        // include:{
        //     comment:{
        //         include:{
        //             user:true
        //         }
        //     }
        // }

        // fetch post with comment specific name
        include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name : true
                        }
                    }
                }
            }
        },
        // to get the post in descending order
        orderBy: {
            id : "desc"
        },
        // get the post more than one
        where:{
            comment_count:{
                // gt = greater than
                gt : 1
            }
        },
        where:{
            title:{
                // get the data which is start with js, to get the data with end data use = endsWith
                startsWith:"js"
            }
        }
    })
    // to get the total posts count
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    return res.json({status:200, data:posts, meta:{totalPages, currentPage:page, limit:limit}})
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


//  To search the post
export const searchPost = async(req, res) =>{
    const query = req.query.q 
    const posts = await prisma.post.findMany({
        where:{
            description:{
                search:query
            }
        }
    })
    return res.json({status:200, data:posts})
}