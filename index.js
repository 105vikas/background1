const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

//route
const user =require("./routes/user");
app.use("/api/v1", user);               //moute

//activate
app.listen(PORT, ()=>{
    console.log(`App is runing on ${PORT}`);
})

