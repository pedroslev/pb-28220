//----------------------------MODULOS----------------------------
//server
import express from 'express'

//routers
import { statusApp, cart, auth, test } from './routes.js'
import md5 from 'blueimp-md5';

//parser
import bodyParser from 'body-parser';

//instancia express
const app = express();


//sessiones
import session from 'express-session'
import { Cookie } from 'express-session';

//sessions
app.use(session({
    secret: md5('ecompb'),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, sameSite: true}, 
}))
let sessions;


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
app.use('/api/test/', test)


//----------------------------SERVER----------------------------
const PORT = 8080;
const Server = app.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${PORT}`)
})
Server.on('error', error => console.error(`Error en el servidor`, error))
export default{
    sessions
}