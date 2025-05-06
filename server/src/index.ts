import { initServer } from "./app";
import { Server } from "socket.io";
import http from "http"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function init() {
    const app=await initServer();
    const server=http.createServer(app)
    
    const io=new Server(server,{
        cors:{
            origin: "*",
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    io.on('connection', (socket) => {
        console.log('New User Connected');
        socket.emit("me", socket.id);
    
        socket.on('disconnect', () => {
            console.log('User Disconnected');
        });
    
        socket.on("call-user",({toPeerId,fromUserid,toUserid}:{toPeerId:string,fromUserid:string,toUserid:string})=>{
            console.log("call-fromUserid-> ",fromUserid)
            io.to(toUserid).emit("Recieving_call",fromUserid)
        })
    
        socket.on("answerCall",({fromUserid}:{fromUserid:string})=>{
            console.log("fromUserid-> ",fromUserid);
            
            io.to(fromUserid).emit("Call_Accepted")
        })
    });
    // app.listen(8000,()=>console.log(`Server Running at Port 8000`))
    server.listen(8000,()=>{
        console.log("Server i running at port 8000");
        
    })
}
init();