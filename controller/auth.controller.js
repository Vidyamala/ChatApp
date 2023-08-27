const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
exports.signUp=async(req,res)=>{

    var {userId,password,email,profilePic}=req.body;
    userId=userId.toLowerCase();
    const emaill=email.toLowerCase()
    console.log(userId,email)
    console.log(profilePic)
    if(!profilePic) profilePic="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    const userObj={
        userId:userId,
        password:bcrypt.hashSync(password,8),
        email:emaill,
        profilePic:profilePic
    }
    try{
        const user=await User.create(userObj);
        res.status(201).send(user);
    }
    catch(err){
        console.log(err)
        if(err.code==11000){
           if(err.keyValue.userId) return res.status(400).send({message:`UserId ${userId} already exists`})
           else if(err.keyValue.email) return res.status(400).send({message:`Email ${email} already exists`})
        }
       return res.status(500).send({message: err.message})
    }
}
exports.signIn=async(req,res)=>{
    var {userId,password}=req.body;
    userId=userId.toLowerCase();
    const user=await User.findOne({userId});
    if(!user){
        res.status(400).send({message:"UserId doesn't exists"});
        return;
    }
    var iscorrectPassword=bcrypt.compareSync(password,user.password);
    if(!iscorrectPassword){
       return res.status(403).send({message:"Invalid password"})
    }
    const token=jwt.sign({id:user._id},process.env.SECRET,{
        expiresIn:"30d"
    })
    res.status(200).send({
       user,
        token:token
    })

}

exports.getUser=async (req,res)=>{
    console.log(req.userId);
    console.log(req.query.match);
    const {match}=req.query;
    if(!match){
        return res.status(200).send([])
    }
    const findcondition=(!match)?{}:{$or:[{userId:{$regex:match,$options:"i"}},{email:{$regex:match,$options:"i"}}]};
    const user=await User.find(findcondition).find({ _id: { $ne: req.userId } });
    if(user.length==0) return res.status(200).send({message:"No match found"})
    res.status(200).send(user)
}
exports.getUserById=async(req,res)=>{
    const {userid}=req.params;
    console.log(userid)
    const user=await User.find({_id:userid});
    res.status(200).send(user)
}