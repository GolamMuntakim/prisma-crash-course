import {Router} from "express";
import { createPost, deletepost, fetchPosts, searchPost, showPost, updatepost } from "../controller/PostController.js";

const router = Router()

router.get("/", fetchPosts)
router.get("/search", searchPost)
router.get("/:id", showPost)
router.post("/", createPost)
router.put("/:id", updatepost)
router.delete("/:id", deletepost)

export default router;