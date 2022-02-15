//----------------------------MODULOS----------------------------
const fs = require('fs')
const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const router = express.Router()
const prods = express.Router()
const cart = express.Router()
const bodyParser = require('body-parser');
const { nextTick, send } = require('process');
const { createPublicKey } = require('crypto');
const { CHAR_ZERO_WIDTH_NOBREAK_SPACE } = require('picomatch/lib/constants');

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
//-----PRODUCTOS ROUTE
app.use('/api/productos', prods);
let productos = [];


//GET PRODS
prods.get('/', (req, res) => {
try {
    let data = fs.readFileSync('./storage/productos.json', 'utf-8')
        data = JSON.parse(data)
        if(data.length===0){res.send('no hay productos')}else{
            res.json(data);
        }    
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
});

//GET PROD BY ID
prods.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){res.send({error: 'El parametro ingresado no es un numero'})}
    try {
        let data = fs.readFileSync('./storage/productos.json', 'utf-8')
            data = JSON.parse(data)
            if(id > data.length){res.send({error: 'El parametro ingresado esta fuera de rango'})}
            else{
                res.json(data[id])
            }    
        } catch (error) {
            console.error(`Ha ocurrido un error inesperado: ${error}`)
        }
    });

//CREACION DE NUEVO PROD
prods.post('/:admin', (req, res) => {
    const admin = parseInt(req.params.admin)
    if(admin){
        let producto = {
            id: productos.length + 1,
            timestamp: Date.now(),
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            stock: req.body.stock
        }
        try {
            let data = fs.readFileSync('./storage/productos.json', 'utf-8')
            data = JSON.parse(data)
            console.log(data)
            let id = data.length;
            producto.id = id;
            productos.push(producto);
            console.log(producto);
            data.push(producto)
            fs.promises.writeFile('./storage/productos.json', JSON.stringify(data, null, 2))
            res.redirect('/')
        } catch (error) {
            console.error(`Ha ocurrido un error inesperado: ${error}`)
        }
    }else{
        res.send(`Esta accion esta solo permitida para administradores`)
    }
    
})

//PROD EDICION    
prods.put('/:id:admin', (req, res) => {
    const admin = parseInt(req.params.admin)
    if(admin){
        const id = parseInt(req.params.id)
        if(isNaN(id)){res.send({error: 'El parametro ingresado no es un numero'})}
        try {
            let data = fs.readFileSync('./storage/productos.json', 'utf-8')
            data = JSON.parse(data)
            if(id > data.length){res.send({error: 'El parametro ingresado esta fuera de rango'})}
            data[id].title = req.body.title;
            data[id].description = req.body.description;
            data[id].code = req.body.code;
            data[id].price = req.body.price;
            data[id].thumnail = req.body.thumnail;
            data[id].stock = req.body.stock;
            fs.promises.writeFile('./storage/productos.json', JSON.stringify(data, null, 2))
            console.log(`Producto de id ${id} actualizado con exito`)
            res.redirect('/')
        } catch (error) {
            console.error(`Ha ocurrido un error inesperado: ${error}`)
        }
    }else{
        res.send(`Esta accion esta solo permitida para administradores`)
    }
    
})

//PROD DELETE
prods.delete('/:id:admin', (req, res) => {
    const admin = parseInt(req.params.admin)
    if(admin){
        try {
            const id = parseInt(req.params.id)
            let data = fs.readFileSync('./storage/productos.json', 'utf-8')
            data = JSON.parse(data)
            if(id > data.length){res.send(`No existe tal id en productos`)}
            else{
                data = data.filter(data => data.id != id)
                fs.promises.writeFile('./storage/productos.json', JSON.stringify(data, null, 2))
                console.log(`Producto eliminado con exito`)
                res.redirect('/')
            }
        } catch (error) {
            console.error(`Ha ocurrido un error inesperado: ${error}`)
        }
    }else{
        res.send(`Esta accion esta solo permitida para administradores`)
    }
    
})

//-----CARRITO ROUTE
app.use('/api/carrito', cart);
let carros = []

//CREACION DE NUEVO CART
cart.post('/', (req, res) => {
    let carro = {
        id: carros.length + 1,
        timestamp: Date.now(),
        prods: []
    }
    try {
        let data = fs.readFileSync('./storage/carritos.json', 'utf-8')
        data = JSON.parse(data)
        let id = data.length;
        carro.id = id
        carro.prods = []
        data.push(carro);
        console.log(carro);
        fs.promises.writeFile('./storage/carritos.json', JSON.stringify(data, null, 2))
        res.redirect('/')
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
})

//DELETE WHOLE CART
cart.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let data = fs.readFileSync('./storage/carritos.json', 'utf-8')
        data = JSON.parse(data)
        if(id > data.length){res.send(`No existe tal id de carro`)}else{
            data = data.filter(data => data.id != id)
            fs.promises.writeFile('./storage/carritos.json', JSON.stringify(data, null, 2))
            console.log(`Producto eliminado con exito`)
            res.redirect('/')
        }
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
})

//GET PRODS FROM CART
cart.get('/:id/productos', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let data = fs.readFileSync('./storage/carritos.json', 'utf-8')
        data = JSON.parse(data)
        if(id > data.length){res.send(`El ID ingresado se encuentra fuera de rango`)}
        else{
            res.json(data[id].prods)
        }
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
})

//ADD PRODS TO SPECIFIC CART
cart.post('/:id/productos/:id_prod' , (res, req) => {
    try {
        const id = parseInt(req.params.id)
        const id_prod = parseInt(req.params.id_prod)
        let carts = fs.readFileSync('./storage/carritos.json', 'utf-8')
        carts = JSON.parse(carts)
        let prods = fs.readFileSync('./storage/carritos.json', 'utf-8')
        prods = JSON.parse(prods)
        if(id > carts.length || id_prod > prods.length){res.send(`Uno de los parametros esta fuera de rango`)}
        else{
            carts[id].prods.push(id_prod)
            console.log(`Producto agregado con exito`)
            res.json(carts[id])
        }
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
})

//DELETE PRODS FROM CART
cart.delete('/:id/productos/:id_prod', (res, req) => {
    try {
        const id = parseInt(req.params.id)
        const id_prod = parseInt(req.params.id_prod)
        let carts = fs.readFileSync('./storage/carritos.json', 'utf-8')
        carts = JSON.parse(carts)
        if(id > carts.length || !carts.some(id_prod)){res.send(`Uno de los parametros esta fuera de rango`)}
        else{
            let newprods = []
            for (let index = 0; index < carts[id].prods.length; index++) {
                if(carts[id].prods[index] != id_prod){
                    newprods.push(carts[id].prods[index])
                }
            }
            carts[id].prods = newprods;
        }
    } catch (error) {
        console.error(`Ha ocurrido un error inesperado: ${error}`)
    }
})

/*
//----------------------------Sockets----------------------------
const mensajes = []

io.on('connection', socket => {
    console.log('user connection established successfully')

    // Envio los mensajes al cliente que se conectó 
    socket.emit('mensajes', mensajes)

    // Escucho los mensajes enviado por el cliente y se los propago a todos 
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
*/

//----------------------------SERVER----------------------------
const PORT = 8080;
httpServer.listen(PORT, () => console.log('Server on!'))