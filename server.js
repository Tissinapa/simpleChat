const net = require("net")

const port = "8124"

let sockets = []

const server = net.createServer(socket =>{

    sockets.push(socket)
    console.log("client connected")
    
    socket.on("data", data =>{
        broadcast(data,socket)
    })

    socket.on("error", (err) => {
        throw err
    })

    socket.on("end", (err) => {
        console.log("Client disconnected")
    })
    
})

server.listen(port, () =>{
    console.log("server bound")
})
function broadcast(message, socketSent){

    if (message.toString()==="quit"){
        const index = sockets.indexOf(socketSent)
        
        sockets.splice(index,1)
    } else {
        sockets.forEach(socket => {
            if(socket !== socketSent){
                socket.write(message)
            }
            
        })
        
    }

}