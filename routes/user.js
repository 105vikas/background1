const express=require("express")
const router=express.Router();

const {login, singnup}= require( "../controller/Auth");
const {auth, isStudent, isAdmin}=require("../middlewares/Auth")

router.post("/login",login);
router.post("/singnup",singnup);


router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome protal role for tester',
    });
});

//Protected route 
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to student portal',
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to Admin Portal',
    });
});

module.exports=router;