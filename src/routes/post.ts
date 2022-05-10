import { Router } from "express";
import { addComment } from "../controllers/comment.controller";
const router = Router();

router.post("/comment", addComment);

export default router;
