const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user is connected.")
    socket.on("message", (message, roomName) =>{
        if (roomName.length){
            console.log("sending message", message, "to room", roomName)
            io.to(roomName).emit("message", message)
        }else{
        console.log("sending message", message, "to all rooms")
        io.emit("message", message)
        }
    })
    socket.on("joinRoom", (roomName) => {
        console.log("Joining room: ", roomName)
        socket.join(roomName)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected.")
        socket.removeAllListeners("message");
        socket.removeAllListeners("joinRoom");
    })
})

console.log("hello");