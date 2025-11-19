import { signup,login,allUser,updateUserRole,updateProfile } from "../controllers/userController.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/allUser",allUser);
router.put("/update-role",authMiddleware,checkAdmin,updateUserRole);
// router.put("/update-profile", authMiddleware, updateProfile);
router.put("/update-profile", authMiddleware, uploadAvatar.single("avatar"), updateProfile);
router.get("/me", authMiddleware, getMyProfile);

export default router;