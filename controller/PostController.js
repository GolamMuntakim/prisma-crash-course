import prisma from "../DB/db.config.js";
// get data
export const fetchPosts = async(req, res) =>{
    const users = await prisma.user.findMany({})
    return res.json({status:200, data:users})
}
// show single user
export const showUser = async(req,res) =>{
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })
    return res.json({status:200, data:user})
}
// create user
 export const createUser = async(req,res)=>{
    const {name, email, password} = req.body
    const findUser = await prisma.user.findUnique({
        where:{
            email : email
        }
    })
    if(findUser){
        return res.json({status:400, message:"Email already taken, please provide another one"})
    }
    const newUser = await prisma.user.create({
        data:{
            name : name,
            email : email,
            password : password
        }
    })
    return res.json({status:200, data:newUser, msg:"user created"})
 }

//  update the user
export const updateUser = async(req,res) =>{
    const userId = req.params.id;
    const {name, email, password} = req.body;
    await prisma.user.update({
        where:{
            id: Number(userId)
        },
        data:{
            name,
            email,
            password
        }
    })
    return res.json({status:200, message:"user updated successfully"})
}
 // Delete user
 export const deleteUser = async(req, res) =>{
        const userId = req.params.id;
        await prisma.user.deleteMany({
            where:{
                id:Number(userId)
            }
        })
        return res.json({status:200, message:"user deleted successfully"})
 }