const mongoose=require("mongoose");

require("dotenv").config();

exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB connect successfully")})
    .catch((err)=>{
        console.log("DB connection ISSUE")
        console.error(err);
        process.exit(1);               // kuch fat gya ise liye ham bahar nikal rhe
    })
}