import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/auth.controller";
const router = Router();
import { index } from "../controllers/index.controller";

router.get("/", index);
router.post("/signup", createUser);
router.get("/users", getAllUsers);

export default router;
