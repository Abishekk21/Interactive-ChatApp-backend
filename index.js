const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const collection = require("./mongo");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () =>{
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () =>{
    console.log("SERVER RUNNING");
})

//------------------------------

app.post("/",async(req,res)=>{
    const {currentMessage}=req.body

    const data = {
        currentMessage:currentMessage
    }

    await collection.insertMany([data])
})

app.listen(3000,()=>{
    console.log("port connected")
})

