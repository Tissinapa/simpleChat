const net = require("net");
const { resolve } = require("path");
const host = "127.0.0.1"
const port = "8124"
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const getUsername = new Promise(resolve => {
    readline.question("Set nickname: ", username =>{
        resolve(username)
    })
})

getUsername.then(username => {
    const socket = net.connect({
        port: port, 
        host: host
    })
    socket.on("connect", () => {
        socket.write(username + " joined the chat")
    })
    readline.on("line", data =>{
        if(data === "quit"){
            socket.write(`${username} has left the chat...`)
            socket.setTimeout(2000)
        }else{
            socket.write(username + ": " + data)
        }
    })
    socket.on("timeout", () => {
        socket.write("quit")
        socket.end()
    })
    socket.on("end", () => {
        process.exit()
    })
    socket.on("error", (err) => {
        console.log("Server error")
        console.log(err)
    })
    socket.on("data", data => {
        console.log('\x1b[32m%s\x1b[0m', data)
    })
})