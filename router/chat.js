const chatController=require("../controller/chat.controller");
const authmiddleware=require("../middleware/auth.middleware");
module.exports= (app)=>{
    app.post("/chatapp/api/v1/accessChat",authmiddleware.auth,chatController.accessChat);
    app.get("/chatapp/api/v1/fetchchatofUser",authmiddleware.auth,chatController.fetchChatofUser);
    app.post("/chatapp/api/v1/createGroupchat",authmiddleware.auth,chatController.createGroupchat);
    app.put("/chatapp/api/v1/addusertogroup",authmiddleware.auth,chatController.addUsersTogroup);
    app.put("/chatapp/api/v1/removeuserfromgroup",authmiddleware.auth,chatController.removeUserFromGroup);
    app.put("/chatapp/api/v1/renamegroupchat",authmiddleware.auth,chatController.renameGroupChat);
}