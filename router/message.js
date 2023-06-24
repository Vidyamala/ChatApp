const messageController=require("../controller/message.controller");
const authmiddleware=require("../middleware/auth.middleware");
module.exports= (app)=>{
    app.post("/chatapp/api/v1/sendmessage",authmiddleware.auth,messageController.sendmessage);
    app.get("/chatapp/api/v1/getmessagebychatid",authmiddleware.auth,messageController.getMessageByChatId);
   
}