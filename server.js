// general guindece from https://www.youtube.com/watch?v=-rVxORKWzv0
// I used book to gain some knowledge about node.js sockets
// Peltomäki, J., 2020. Node.js web-palveluiden ohjelmointi
const net = require("net")
const host = "127.0.0.1"
const port = "8124"

let sockets = []
let sockets2 = []

const server = net.createServer(socket =>{

    console.log("Client connected")
    
    sockets.push(socket)
    socket.on("data", data =>{
        broadcast(data,socket)
    })

    socket.on("error", (err) => {
        console.log("Error ")
        console.log(err)
    })

    socket.on("end", (err) => {
        console.log("Client disconnected")
    })
    
})
server.listen(port,host, () => console.log("Server opened at Host: " + host + " Port: " + port ))

function broadcast(message, socketSent){

    if (message.toString().match("/channel1") ){
        console.log("Moveing to channel 1")
        server.getConnections((err, clients)=>{
            if(err){
                console.log(err)
            }
            sockets.push(clients)
            const index = sockets2.indexOf(socketSent)
            sockets2.splice(index,1)

        })

    }else if (message.toString().match("/channel2")){
        console.log("Moveing to channel 2")
        server.getConnections((err, clients)=>{
            if(err){
                console.log(err)
            }
            sockets2.push(clients)
            const index = sockets.indexOf(socketSent)
            sockets.splice(index,1)

        })

    }else if(message.toString() === "quit"){
        const index = sockets.indexOf(socketSent)
        sockets.splice(index,1)
    
    }else {
        sockets.forEach(client => {
            if(client !== socketSent){
                
                client.write(message)
            }
            
        })
        
    }

}