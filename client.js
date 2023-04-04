const net = require("net");
const { resolve } = require("path");
const port = "8124"
const readLine = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const getUsername = new Promise(resolve => {
    readLine.question("Set nickname: ", username =>{
        resolve(username)
    })
})

getUsername.then(username => {
    const socket = net.connect({
        port: port
    })
    socket.on("connect", () => {
        socket.write(username + " joined the chat")
    })
    readLine.on("line", data =>{
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
    })
    socket.on("data", data => {
        console.log('\x1b[33m%s\x1b[0m', data)
    })
})