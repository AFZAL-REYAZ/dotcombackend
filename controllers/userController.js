import user from "../models/userModel.js";

export const signup=async(req,res)=>{
    try{
        const {name, email,password}=req.boby;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser= await user.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User alreay registered"});
        }
         // 3️⃣ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser= await user.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            message:"SignUp Successfull",
        })


    }catch(err){
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }

}



