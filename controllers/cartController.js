import User from "../models/userModel.js";

/** ✅ Add item to cart */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = "M" } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // check if product already in cart
    const exist = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (exist) {
      exist.quantity += quantity; // update qty
    } else {
      user.cart.push({ product: productId, quantity, size });
    }

    await user.save();

    // return populated cart
    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.json(populatedUser.cart);
  } catch (err) {
    console.log("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/** ✅ Get my cart */
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    console.log("GET CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/** ✅ Remove one product (by product id) */
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.json(populatedUser.cart);
  } catch (err) {
    console.log("REMOVE CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/** ✅ Update quantity (by cart item _id) */
export const updateCartQty = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (c) => c._id.toString() === cartItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = quantity;

    await user.save();

    const populatedUser = await User.findById(user._id).populate(
      "cart.product"
    );

    res.json(populatedUser.cart);
  } catch (err) {
    console.log("UPDATE CART QTY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



