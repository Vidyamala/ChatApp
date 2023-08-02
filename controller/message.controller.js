// 1) addMessageTochat
// 2) getAllMessagesBychatid
const Message=require("../models/message.model");
const User=require("../models/user.model")
const Chat=require("../models/chat.model")
const { populate } = require("../models/user.model");
exports.sendmessage=async (req,res)=>{
    const {content,chatId}=req.body;
    const message=await Message.create({content,chat:chatId,sender:req.userId});
    let fullMessage=await Message.findOne({_id:message._id}).populate("sender","-password").populate("chat");
    fullMessage=await User.populate(fullMessage,{path:"chat.users",select:"userId email profilePic"});
    const chat=await Chat.findOneAndUpdate({_id:chatId},{latestMessage:fullMessage})
    res.status(201).send(fullMessage);
}
exports.getMessageByChatId=async (req,res)=>{
    const {chatId}=req.query;
    console.log(chatId)
   try{
    let message=await Message.find({chat:chatId}).populate("sender","-password")
    // .populate("chat");
    // message=await User.populate(message,{path:"chat.users",select:"email profilePic userId"});
    // message=await Message.populate(message,{path:"chat.latestMessage",select:"content sender"})
    res.status(200).send(message);
   }
   catch(err){
    res.status(500).send(err.message)
   }
}