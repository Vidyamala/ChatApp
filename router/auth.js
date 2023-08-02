const authControllers=require("../controller/auth.controller");
const authmiddleware=require("../middleware/auth.middleware");
module.exports= (app)=>{
    app.post("/chatapp/api/v1/signup",authControllers.signUp);
    app.post("/chatapp/api/v1/signin",authControllers.signIn);
    app.get("/chatapp/api/v1/getusers",authmiddleware.auth,authControllers.getUser);
    app.get("/chatapp/api/v1/getUserById/:userid",authmiddleware.auth,authControllers.getUserById);
}