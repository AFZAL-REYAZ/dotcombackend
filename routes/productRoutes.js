import express from "express";
import upload from "../middleware/uploadCloudinary.js";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Add product (with image)
router.post("/add", (req, res, next) => {
    console.log("➡ HIT /api/products/add route");
    next();
}, upload.single("image"), addProduct);


// All products
router.get("/", getAllProducts);

// Single product
router.get("/:id", getSingleProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
