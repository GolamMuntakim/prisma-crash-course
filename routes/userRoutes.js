import {Router} from 'express';
import { createUser } from '../controller/UserController.js';

const router = Router();

router.post("/", createUser)

export default router