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
        //id not needed bc DB got autoincremental
//        id: productos.length + 1,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    //productos.push(producto);
    console.log(producto);
    //res.json(producto)
    //db insertion  
    mariadb('productos').insert(producto)
        .then(() => console.log('data inserted successfully'))
        .catch((err) => {console.log(`Unexpected inserting data on table -> : ${err}`)})
        .finally(() => knex.destroy())

    res.redirect('/')
    //res.status(200)
})

//----------------------------DB's----------------------------
//sqlite for mensajes
const sqlite = require('knex')({
    client: 'better-sqlite3',
    connection: {filename: './DB/ecommerce.sqlite'},
    useNullAsDefault: true
})
//table creation of mensajes sqlite3
//needed only once
/*
sqlite.schema.createTable('mensajes', table => {
        table.increments('id')
        table.varchar('email'),
        table.varchar('mensaje')
    })
    .then(() => console.log(`table mensajes created`))
    .catch((err) => {console.log(`Unexpected Creating table Error: ${err}`)})
  */

//mariaDB(mysql) for productos :)
const mariadb = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'admin',
        password: 'addme',
        database: 'ecom'
    },
    pool: {min: 0, max:7}
})
/*
//needed only once (scripted)
mariadb.schema.createTable('productos', table => {
    table.increments('id')
    table.varchar('title'),
    table.varchar('price'),
    table.varchar('thumbnail')
})
.then(() => console.log(`table productos created`))
.catch((err) => {console.log(`Unexpected Creating table Error: ${err}`)})
*/

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
        //insertar en db sqlite
        sqlite('mensajes').insert(data)
        .then(() => console.log('data inserted successfully'))
        .catch((err) => {console.log(`Unexpected inserting data on table -> : ${err}`)})
        .finally(() => knex.destroy())
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