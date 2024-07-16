const bcrypt = require("bcrypt");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//singnup router 
exports.singnup=async(req,res)=>{
    try{
        //get data
        const {name, email, password, role}=req.body;
        //check if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: `User Already Exists`,
            });
        }

        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return req.status(500).json({
                success:false,
                message:`Error in hasing Password`,
            });
        }

        //create user
        const user =await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:`User Created Successfully`,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:`User cannot be register, Please try again later`
        });
    }
}


//login 
exports.login=async(req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'please fill all details',
            });
        }

        let user= await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Please Register you id',
            });
        }
        const payload={
            email:user.email,
            id:user.id,
            role:user.role,
        };
        if(await bcrypt.compare(password, user.password)){
            let token=jwt.sign(payload,
                                process.env.JWT_SECRET,{
                                    expiresIn:"2h",
                                });

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const option={
                expiresIn:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("cookieVikas", token , option).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully'
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:'Password Incorrect',
            });
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'login Failer'
        })

    }
}