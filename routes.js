//Router
import { Router } from 'express'
//gmail
import nodemailer from 'nodemailer'
//import SendmailTransport from 'nodemailer/lib/sendmail-transport';

import {passport} from './persistence.js';

//logger
//import { log4js } from 'log4js';

/*
//----------------------------Log4js----------------------------
log4js.configure({
    appenders: {
        LoggerConsole: {type: 'console'},
        LoggerFileWarning: {type: 'file', filename: './log/warn.log'},
        LoggerFileError: {type: 'file', filename: './log/error.log'}
    },
    categories:{
        default: {appenders: ["LoggerConsole"], level: "trace"},
        consola: {appenders: ["LoggerConsole"], level: "debug"},
        error: {appenders: ["LoggerFileError"], level: "info"},
        warning: {appenders: ["LoggerFileWarning"], level: "warn"},
        todos: {appenders: ["LoggerConsole", "LoggerFileWarning", "LoggerFileError"], level: "error"}
    }
})
const loggerInfo = log4js.getLogger('default')
const loggerWarn = log4js.getLogger('warn')
const loggerError = log4js.getLogger('err')
*/

//IMPORTS
import { mailingSender } from './controllers.js';
import {addToCart} from './persistence.js';
import {getDBState} from './service.js'

//INGRESAR SU MAIL PARA PROBAR.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'ingresarmail@gmail.com',
        pass: 'password'
    }
 });


//----------------------------RUTAS----------------------------

//routes
const auth = new Router();
const statusApp = new Router();
const cart = new Router();
export{
    statusApp,
    cart,
    auth,
}

statusApp.get('/dbconnection', (req, res) => {
let status = getDBState(mongoose.connection.readyState);
res.send(status)
})


cart.post('/addtocart', (req, res) => {

    let addingItem = {
        email: sessions.user,
        producto: req.body.producto,
        precio: req.body.precio
    }

    let sendToDB = addToCart(addingItem)
    if(sendToDB){
        res.status("200")
    }else{
        loggerError.error(sendToDB)
        res.status("500")
    }
})

cart.get('/cartsender', (req, res) => {

    carts.find({email: sessions.user}, function(err, docs){
            if(err){
                console.log(err)
            }else{
                const mailOptions = {
                    from: 'server node',
                    to: 'plopezslevin@gmail.com',
                    subject: 'Mail de prueba',
                    html: `
                    <h1>Productos</h1>
                    ${docs.producto}
                    <h1>Precios</h1>
                    ${docs.precios}`
                }

                const optionswsp = {
                body: `Hola este es su carrito de compras: ${docs}`,
                   from: 'whatsapp:+14155238886',
                   to: 'whatsapp+5491161238744'
                }
                const optionssms = {
                    body: `Hola este es su carrito de compras: ${docs}`,
                       from: '+14155238886',
                       to: '+5491161238744'
                    }

                try {
                    //sending mail
                    mailingSender(optionswsp)
                    mailingSender(optionssms)
                    //const info = transporter.sendMail(mailOptions)
                } catch (error) {
                    loggerError.error(`Ha ocurrido un error al enviar el mail de carrito: ${error}`)
                }
            }
        }) 
     res.redirect('/ecommerce')
})


auth.post('/register', (req, res) => {
 let newuser = {
    email: req.body.email,
    password: md5(req.body.password),
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    edad: req.body.edad,
    telefono: req.body.telefono
 }
 let pushtoDB = newUser(newuser)
 if(newuser){
    res.redirect('/ecommerce')
 }else{
     loggerError.error(pushtoDB)
     res.status("500")
 }
 

})

auth.post('/login', passport.authenticate('local', { failureRedirect: '/register'}) ,(req, res) => {
    try {        
        sessions = req.session;
        sessions.user = req.body.username;
        loggerInfo.info(`Secret inicializada con exito ${req.session.user}`)
        res.redirect('/ecommerce')
    } catch (error) {
        loggerError.error(`ha ocurrido un error con el login y su activacion de session: ${error}`)
    }
})

auth.post('/logout', (req, res) => {
    try {
        loggerInfo.info(`destruyendo session de ${sessions.user}`)
        req.session.destroy
        res.redirect('/login')
    } catch (error) {
        loggerError.error(`Ha ocurrido un error para eliminar la session: ${error}`)
    }
})

