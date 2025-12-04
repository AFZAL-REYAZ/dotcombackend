import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:id", authMiddleware, removeFromCart); // id = productId
router.put("/update/:id", authMiddleware, updateCartQty);     // id = cartItemId

export default router;
