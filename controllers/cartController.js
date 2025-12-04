import User from "../models/userModel.js";
import Product from "../models/productModel.js";

/* ============================
   ✅ ADD TO CART
============================ */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = "M" } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product id required" });
    }

    const qty = Math.max(1, Number(quantity)); // ✅ prevent 0 / negative

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ ensure cart exists
    if (!user.cart) user.cart = [];

    // ✅ check existing item
    const exist = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (exist) {
      exist.quantity += qty;
    } else {
      user.cart.push({
        product: productId,
        quantity: qty,
        size,
        priceAtThatTime: product.price, // ✅ VERY IMPORTANT
      });
    }

    await user.save();

    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.status(200).json(populatedUser.cart);

  } catch (err) {
    console.log("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================
   ✅ GET MY CART
============================ */
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.cart);
  } catch (err) {
    console.log("GET CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================
   ✅ REMOVE FROM CART (product id)
============================ */
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.status(200).json(populatedUser.cart);
  } catch (err) {
    console.log("REMOVE CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================
   ✅ UPDATE CART QUANTITY
============================ */
export const updateCartQty = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    const qty = Math.max(1, Number(quantity));

    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (c) => c._id.toString() === cartItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = qty;

    await user.save();

    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.status(200).json(populatedUser.cart);
  } catch (err) {
    console.log("UPDATE CART QTY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
