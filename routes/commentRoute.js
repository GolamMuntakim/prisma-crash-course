import {Router} from "express";
import { createComment, deleteComment, fetchComments, showComment, updateComment } from "../controller/CommentController.js";

const router = Router();

router.post("/", createComment)
router.get("/", fetchComments)
router.get("/:id", showComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)

export default router;