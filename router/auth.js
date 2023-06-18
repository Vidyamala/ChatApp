const authControllers=require("../controller/auth.controller")
module.exports= (app)=>{
    app.post("/chatapp/api/v1/signup",authControllers.signUp);
    app.post("/chatapp/api/v1/signin",authControllers.signIn);
}