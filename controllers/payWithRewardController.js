import payWithReward from "../models/payWithRewardModels.js";

// Save payment details to MongoDB
export const savePaymentDetail = async (req, res) => {
  try {
    const { name, mobile, amount, rewardCoins } = req.body;

    // Validate data
    if (!name || !mobile || !amount ||rewardCoins) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new payment entry
    const newPayment = new payWithReward({
      name,
      mobile,
      amount,
      rewardCoins,
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

export const getPaymentDetail=async(req,res)=>{
    try{
       const allPayRewardData =  await payWithReward.find();
       if(!allPayRewardData || !allPayRewardData===0){
        return res.status(404).json({message:"no payment record found"})
        // alert("problem related  ")
       }
       res.status(200).json({
        message:"payment record fetched successfully",
        data:allPayRewardData
       })
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}




