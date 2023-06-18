const serverConfig=require("./config/server_config")
const express=require("express");
const bodyparser=require("body-parser");
const app= express();
app.use(bodyparser.json());
const mongoose=require("mongoose");
const { db_URL } = require("./config/db.config");
const connectDB = require("./config/db.connect");
// mongoose.connect(db_URL,()=>{
//     console.log("Connected to Mongo DB")
// },err=>{
//     console.log("Error: ",err.message);
// })
 connectDB();
require("./router/auth")(app)
app.listen(serverConfig.PORT,()=>{
    console.log(`Application running on port ${serverConfig.PORT}`);
})