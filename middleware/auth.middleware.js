const {User}=require("../models/user.model");
const jwt=require("jsonwebtoken")
exports.auth=async(req,res,next)=>{
    const {token}=req.headers;
    const user=jwt.verify(token,process.env.SECRET);
    req.userId=user.id;
    next();
}