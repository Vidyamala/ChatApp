const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
exports.signUp=async(req,res)=>{
    var {userId,password,email,profilePic}=req.body;
    if(!profilePic) profilePic="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    const userObj={
        userId:userId,
        password:bcrypt.hashSync(password,8),
        email:email,
        profilePic:profilePic
    }
    try{
        const user=await User.create(userObj);
        res.status(201).send(user);
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
}
exports.signIn=async(req,res)=>{
    const {userId,password}=req.body;
    const user=await User.findOne({userId});
    if(!user){
        res.status(400).send({message:"UserId doesn't exists"});
        return;
    }
    var iscorrectPassword=bcrypt.compareSync(password,user.password);
    if(!iscorrectPassword){
        res.status(403).send({message:"Invalid password"})
    }
    const token=jwt.sign({id:user._id},process.env.SECRET,{
        expiresIn:"30d"
    })
    res.status(200).send({
        userId:user.userId,
        email:user.email,
        token:token
    })

}