import {Router} from 'express';
import userRouter from './userRoutes.js'
import postRouter from './postRoute.js'
import commentRouter from './commentRoute.js'
const router = Router();

router.use("/api/user", userRouter)
// for post routes
router.use("/api/post", postRouter)
//for comment
router.use("/api/comment", commentRouter)

export default router