import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    image: [{ type: String, required: true }], // URL or uploaded file
    public_id: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;


