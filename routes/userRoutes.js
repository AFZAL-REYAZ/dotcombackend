import { signup,login,allUser } from "../controllers/userController.js";
import express from "express";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/allUser",allUser);

export default router;