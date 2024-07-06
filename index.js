import { Server } from "socket.io";
import express from "express";
import {createServer} from "http";
import path from 'path';

const PORT = 9000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection",(socket)=>{
    // console.log("A new user connected",socket.id);
    socket.on("user-msg",(message)=>{
        // console.log("A new user msg received : ",message);
        socket.broadcast.emit("message",message);// particular socket ko chod kar baki sab me jayega (is socket se msg har jagah broadcast ho raha hai)
    })
})

app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html");
})

server.listen(PORT,()=>console.log(`Server listening at ${PORT}`));