import mongoose, { Mongoose } from "mongoose";

const userScheema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true, // prevents duplicate emails
        lowercase: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps:true
}
)


const user=mongoose.model("userScheema",userScheema);
export default user;

