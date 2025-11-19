import payWithReward from "../models/payWithRewardModels.js";
import User from "../models/userModel.js"; 

// Save payment details to MongoDB

export const savePaymentDetail = async (req, res) => {
  try {
    const { name, email, amount, rewardCoins } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const newPayment = new payWithReward({
      name,
      email,
      amount: numericAmount,
      rewardCoins: Number(rewardCoins) || 0,
    });

    await newPayment.save();

    // ⭐ Correct email matching
    const cleanEmail = email.trim().toLowerCase();

    const updatedUser = await User.findOneAndUpdate(
      { email: cleanEmail },
      { $inc: { rewardCoins: Number(rewardCoins) || 0 } },
      { new: true }
    );

    console.log("UPDATED USER:", updatedUser);

    res.status(201).json({
      message: "Payment details saved successfully",
      data: newPayment,
    });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




// Get all payments
export const getPaymentDetail = async (req, res) => {
  try {
    const allPayRewardData = await payWithReward.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "✅ Payment record fetched successfully",
      data: allPayRewardData,
    });
  } catch (error) {
    console.log("====================================");
    console.log("Error in getPaymentDetail:", error.message);
    console.log("====================================");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
