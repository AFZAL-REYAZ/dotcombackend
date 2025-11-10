import payWithReward from "../models/payWithRewardModels.js";

// Save payment details to MongoDB
export const savePaymentDetail = async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    // Validate data
    if (!name || !email || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new payment entry
    const newPayment = new payWithReward({
      name,
      email,
      amount,
    });

    // Save to database
    await newPayment.save();

    res.status(201).json({
      message: "Payment details saved successfully",
      data: newPayment,
    });
  } catch (err) {
    console.log("====================================");
    console.log("Error in savePaymentDetail:", err.message);
    console.log("====================================");
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


