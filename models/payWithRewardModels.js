import mongoose from "mongoose";

const payWithRewardSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    amount:{
        type:Number,
        required:true,
        min:1,
    },
    
},
    { timestamps: true } 
)

const payWithReward=mongoose.model("payWithReward",payWithRewardSchema);
export default payWithReward;
