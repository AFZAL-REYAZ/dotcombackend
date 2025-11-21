import payWithReward from "../models/payWithRewardModels.js";
import User from "../models/userModel.js";

// Save payment details to MongoDB
export const savePaymentDetail = async (req, res) => {
  try {
    const { name, mobile, amount, rewardCoins } = req.body;

    // Validation
    if (!name || !mobile || !amount) {
      return res.status(400).json({ message: "Name, mobile and amount are required." });
    }

    // Validate mobile
    const cleanMobile = mobile.trim();
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // Validate amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Save payment record
    const newPayment = new payWithReward({
      name,
      mobile: cleanMobile,
      amount: numericAmount,
      rewardCoins: Number(rewardCoins) || 0,
    });

    await newPayment.save();

    // ⭐ Update user's reward coins
    const updatedUser = await User.findOneAndUpdate(
      { mobile: cleanMobile }, // match by mobile
      { $inc: { rewardCoins: Number(rewardCoins) || 0 } },
      { new: true }
    );

    console.log("UPDATED USER:", updatedUser);

    return res.status(201).json({
      message: "Payment details saved successfully",
      data: newPayment,
    });

  } catch (err) {
    console.log("Error in savePaymentDetail:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get all payment records
export const getPaymentDetail = async (req, res) => {
  try {
    const allPayments = await payWithReward.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Payment record fetched successfully",
      data: allPayments,
    });

  } catch (error) {
    console.log("Error in getPaymentDetail:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
