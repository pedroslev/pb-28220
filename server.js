//----------------------------MODULOS----------------------------
const fs = require('fs')
const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const router = express.Router();
const bodyParser = require('body-parser');
const { nextTick } = require('process');

//instancia express
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
router.use(express.json())
app.use(express.static('public'))


//----------------------------RUTAS----------------------------
//PRODUCTOS
app.use('/api/productos', router);
let productos = [];

router.get('/', (req, res) => {
    if(productos.length===0){res.send('no hay productos')}else{
        res.json(productos);
    
    }
});

router.post('/', (req, res) => {
    let producto = {
        id: productos.length + 1,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    //productos.push(producto);
    console.log(producto);
    //res.json(producto)
    res.redirect('/')
    //res.status(200)
})


//----------------------------Sockets----------------------------
const mensajes = []

io.on('connection', socket => {
    console.log('user connection established successfully')

    /* Envio los mensajes al cliente que se conectó */
    socket.emit('mensajes', mensajes)

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('mensaje', data => {
        mensajes.push({ email: data, mensaje: data })
        io.sockets.emit('mensajes', mensajes)
    })

    socket.emit('productos', productos)

    socket.on('productos', data => {
        productos.push({title: data, price: data, thumbnail: data})
        io.sockets.emit('productos', productos)
    })
})


//----------------------------SERVER----------------------------
const PORT = 8080;
httpServer.listen(PORT, () => console.log('Server on!'))

