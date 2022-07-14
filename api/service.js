import { Server } from 'socket.io'
import { addMsj } from './persistence.js'

const io = new Server('8085' ,{
    cors: {
        origin: "http://localhost:3000",
        extraHeaders: 
        {
            'Access-Control-Allow-Credentials': true
        }
    }
})
const oldmessages = []

io.on('connection', socket => {
    //conn
    console.log('user connection established successfully')

    //conn send messages
    socket.emit('message', oldmessages)
    
    //listen msj
    socket.on('message', data => {
        let newmsj = { 
            timestamp: data.timestamp,
            user: data.user,
            msj: data.msj, 
            }
            addMsj(newmsj)

        oldmessages.push(
            { 
            timestamp: data.timestamp,
            user: data.user,
            msj: data.msj, 
            })
        io.sockets.emit('message', oldmessages)
    })


})

let getDBState = (conn) => {

    switch (conn) {
        case 0:
            return(`DISCONNECTED`)
        break;
    
        case 1:
            return(`CONNECTED`)
        break;
    
        case 2:
            return(`CONNECTING`)
        break;
    
        case 3:
            return(`DISCONNECTING`)
        break;
    
        default:
            break;
    }
}

export {
    getDBState
}