import React from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import './chat.css'
import axios from 'axios'
import io from 'socket.io-client'
axios.defaults.baseURL = 'http://localhost:8080/api/';

function Chat() {

    axios({
        method: "GET",
        withCredentials: true,
        url: "/auth",
      })
    .then((response) => {
    if(response.data.email === undefined){window.location.href= '/login'}
    else{setUser(response.data.email)}
    })

    const [message, setMessage] = React.useState('')
    const [user, setUser] = React.useState('')

    
    //chat front 
    const socket = io('ws://localhost:8085', {
        //withCredentials: true,
        extraHeaders: 
        {
            'Access-Control-Allow-Credentials': true
        }
    });

    let send = () => {
        let realtime = Date().toString()
        socket.emit('message',  
        {
            timestamp: realtime,
            user: user,
            msj: message, 
        });
        setTimeout(() => {window.location.reload()}, 50)
    }
    
     socket.on('message', inbound => {
        const html = inbound.map(
            msj => `<p className="mensajesInbound">${msj.timestamp} | ${msj.user} : ${msj.msj}</p>`
        )
        document.getElementById('messages').innerHTML = html
     })   
    

  return (
    <>
    <div>
        <h1>Chat</h1>
        <hr/>
    </div>
    <div id="messages">
        
    </div>

    <Form className='totalum' onSubmit={() => {send()}}>
        <Row className='segment'>
            <div className='input'>
                <Form.Group className="message">
                    <Form.Control type="text" onChange={(e) => {setMessage(e.target.value)}} placeholder="message" />
                </Form.Group>   
                <Button  className='send' variant="primary" id='sendmsj' onClick={() => {send()}}>Enviar</Button>
            </div>  
      </Row>
    </Form>
    </>
  )
}

export default Chat