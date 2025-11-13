import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup=async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User alreay registered"});
        }
         // 3️⃣ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser= await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            message:"SignUp Successfull",
        })


    }catch(err){
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server Error" });
    }

}

export const login= async(req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invailid User or Password"});
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"invailid User or Password"});
        }
        
        const token = jwt.sign(
            {id:user._id, email:user.email},
            JWT_SECRET,
            {expiresIn:"7d"}
        )

        // 5️⃣ Send success response
            return res.status(200).json({
            message: "Login successful ✅",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            });

    }catch(err){
        console.log("Login error",err);
        res.status(500).json({message:"Server Error"});
    }

}






