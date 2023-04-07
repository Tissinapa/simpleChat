const net = require("net")
const host = "127.0.0.1"
const port = "8124"

let sockets = []

const server = net.createServer(socket =>{

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

    if (message.toString()==="quit"){
        const index = sockets.indexOf(socketSent)
        sockets.splice(index,1)
    
    }else {
        sockets.forEach(socket => {
            if(socket !== socketSent){
                
                socket.write(message)
            }
            
        })
        
    }

}