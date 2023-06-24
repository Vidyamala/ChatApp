// 1) accessChat
// 2) fetch chat of user
// 3) createGroupchat
// 4) addUserToGroupchat
// 5) removeUserFromGroupchat
// 6) renameGroupchat
const Chat=require("../models/chat.model")
exports.accessChat=async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        res.status(400).send({message:"Provide UserId to proceed"});
        return;
    }
    console.log(userId,req.userId);
    const chat=await Chat.findOne({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.userId } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      }).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage")
    console.log("hello")
    if(!chat){
        console.log("helleeeeeeeeeeeeeeeeo")
        let chat=await Chat.create({chatName:"sender",users:[userId,req.userId]});
        const fullChat=await Chat.findOne({_id:chat._id}).populate("users","-password").populate("groupAdmin","-password");
        res.send(fullChat);
        return;
    }
    res.status(200).send(chat);
}
exports.fetchChatofUser= async(req,res)=>{
    const chat=await Chat.find({users:req.userId}).
    populate("users","-password").
    populate("groupAdmin","-password").populate("latestMessage");
    res.status(200).send(chat);
}
exports.createGroupchat=async (req,res)=>{
    var {users,chatName}=req.body;
    if(users.length<2){
        res.status(400).send({message:"To create group chat there should be atleast 2 users"});
        return;
    }
    users=[req.userId,...users];
   
    const chat=await Chat.create({users,isGroupChat:true,groupAdmin:req.userId,chatName});
    const fullChat=await Chat.find({_id:chat._id}).populate("users","-password")
    .populate("groupAdmin","-password");
    res.status(200).send(fullChat);
}
exports.addUsersTogroup=async (req,res)=>{
   const userId=req.body.users;
   const {chatId}=req.body;
   console.log(chatId);
    const chat=await Chat.findOneAndUpdate(
        {_id:chatId},
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      ).populate("users","-password")
      .populate("groupAdmin","-password");
    res.status(200).send(chat);
}
exports.removeUserFromGroup=async (req,res)=>{
    const userId=req.body.users;
    const {chatId}=req.body;
    console.log(chatId);
     const chat=await Chat.findOneAndUpdate(
         {_id:chatId},
         {
           $pull: { users: userId },
         },
         {
           new: true,
         }
       ).populate("users","-password")
       .populate("groupAdmin","-password");
     res.status(200).send(chat);
 }
 exports.renameGroupChat=async (req,res)=>{
    const chatName=req.body.chatName;
    const {chatId}=req.body;
    console.log(chatId);
     const chat=await Chat.findOneAndUpdate(
         {_id:chatId},
         {
          chatName:chatName
         },
         {
           new: true,
         }
       ).populate("users","-password")
       .populate("groupAdmin","-password");
     res.status(200).send(chat);
 }