const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const User=mongoose.model("User",userModel);
module.exports= User;