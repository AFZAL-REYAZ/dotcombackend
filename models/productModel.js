import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },

    image: [{ type: String, required: true }],     // ✅ ARRAY
    public_id: [{ type: String }],                 // ✅ ARRAY
  },
  { timestamps: true }
);



const Product = mongoose.model("Product", productSchema);
export default Product;


