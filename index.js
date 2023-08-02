const serverConfig=require("./config/server_config")
const express=require("express");
const bodyparser=require("body-parser");
const app= express();
var cors = require('cors')
app.use(cors())
app.use(bodyparser.json());
const mongoose=require("mongoose");
const { db_URL } = require("./config/db.config");
const connectDB = require("./config/db.connect");

// mongoose.connect(db_URL,()=>{
//     console.log("Connected to Mongo DB")
// },err=>{
//     console.log("Error: ",err.message);
// })
 connectDB();
require("./router/auth")(app)
require("./router/chat")(app)
require("./router/message")(app);
const server=app.listen(serverConfig.PORT,()=>{
    console.log(`Application running on port ${serverConfig.PORT}`);
})
const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
})
io.on("connection",(socket)=>{
    console.log("connected to socket.io");
   socket.on("set up",(user)=>{
    socket.join(user._id);
    console.log("joined personal room")
   })
   socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("new message", (newMessageRecieved) => {
    console.log("message sent",newMessageRecieved)
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");
    console.log(chat.users,"chat users")
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
       
      socket.to(chat._id).emit("message recieved", newMessageRecieved);
    });
  });
})


// io.on('connection', (socket) => {
//     console.log("Connected to socket.io");
//     socket.on("setup", (userData) => {
//         socket.join(userData._userId);
//         socket.emit("connected");
//     })

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log('User Joined Room:' + room);
//     })
//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if (!chat.users) return console.log("chat.users not defined");
//         chat.users.forEach((user) => {
//             if (user._id == newMessageRecieved.sender._id) return;
//             socket.to(chat._id).emit("message recieved", newMessageRecieved);
//         });
//     })
    
//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//       });
// })