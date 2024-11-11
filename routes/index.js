import {Router} from 'express';
import userRouter from './userRoutes.js'
import postRouter from './postRoute.js'
const router = Router();

router.use("/api/user", userRouter)
// for post routes
router.use("/api/post", postRouter)

export default router