//Router
import { Router } from 'express'
//gmail
import nodemailer from 'nodemailer'
//import SendmailTransport from 'nodemailer/lib/sendmail-transport';

import {passport} from './persistence.js';

//IMPORTS
import { mailingSender } from './controllers.js';
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
const prods = new Router();
export{
    statusApp,
    cart,
    auth,
    prods,
}

statusApp.get('/dbconnection', (req, res) => {
let status = getDBState(mongoose.connection.readyState);
res.send(status)
})


cart.post('/addtocart', (req, res) => {

})

cart.get('/cartsender', (req, res) => {

})


auth.post('/register', (req, res) => {
 

})

auth.post('/login', passport.authenticate('local', { failureRedirect: '/login'}) ,(req, res) => {

})

auth.post('/logout', (req, res) => {

})