//----------------------------MODULOS----------------------------
//server
import express from 'express'

//routers
import { statusApp, cart, auth, prods } from './routes.js'
import md5 from 'blueimp-md5';

//parser
import bodyParser from 'body-parser';

//instancia express
const app = express();

//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))



//----------------------------RUTAS----------------------------
//status route
app.use('/api/status', statusApp)
//cart route
app.use('/api/cart', cart)
//authentication route
app.use('/api/auth', auth)
//prods route
app.use('/api/prods', prods)


//----------------------------SERVER----------------------------
const PORT = 8080;
const Server = app.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${PORT}`)
})
Server.on('error', error => console.error(`Error en el servidor`, error))