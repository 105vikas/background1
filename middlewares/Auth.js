// auth authorisation student , admin

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try {
        const token=req.body.token;
        if(!token){
            return res.status(401).json({
                success:true,
                message:'Token Missing',
            });
        }
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload)
            req.user=payload;
        }catch(error){
            return res.json(401).json({
                success:true,
                message:'token is invalid'
            });
        }
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong while veryfing the token',
        });
    }
}

exports.isStudent=(req,res ,next)=>{
    try {
        if(req.role!="Student"){
            res.status(401).json({
                success:false,
                message:'Portal is protected for Student only',
            });
            next();
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'something went wrong while veryfing the token',
        });
    }

}

exports.isAdmin=(req,res,next)=>{
    try {
        if(req.role!="Admin"){
            res.status(401).json({
                success:true,
                message:'This protal is protected for Admin panel only',
            });
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success:false,
            message:'something went wrong while fetching data from token',
        });
    }
}