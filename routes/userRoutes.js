import { signup,login,allUser,updateUserRole } from "../controllers/userController.js";
import express from "express";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/allUser",allUser);
router.put("/update-role", updateUserRole);

export default router;