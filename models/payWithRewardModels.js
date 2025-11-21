import mongoose from "mongoose";

const payWithRewardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"], // Indian mobile validation
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    rewardCoins: {
      type: Number,
      default: 0,  // Calculated in frontend or backend
    },
  },
  { timestamps: true }
);

const payWithReward = mongoose.model("payWithReward", payWithRewardSchema);
export default payWithReward;
