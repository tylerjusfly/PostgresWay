import { Router } from "express";
import { createPost } from "../controllers/post.controller";
const router = Router();
import { addRoom, getAllRoom, viewRoom } from "../controllers/room.controller";

router.post("/create", addRoom);
router.get("/", getAllRoom);
router.post("/room", viewRoom);

// Post implementation
router.post("/post", createPost);

export default router;
