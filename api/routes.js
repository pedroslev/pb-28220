//Router
import { Router } from 'express'
//gmail
//import nodemailer from 'nodemailer'
import mongoose from 'mongoose';
//import SendmailTransport from 'nodemailer/lib/sendmail-transport';

import { newUser } from './persistence.js';

import { passport } from './server.js';

//IMPORTS
//import { mailingSender } from './controllers.js';
import {getDBState} from './service.js'

/*
//INGRESAR SU MAIL PARA PROBAR.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'ingresarmail@gmail.com',
        pass: 'password'
    }
 });
*/

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


auth.get('/' , (req, res) => {
    res.send(req.user)
})


auth.post('/register', (req, res) => {
 let data = {
    email: req.body.email,
    password: req.body.password
 }

 try {
    let push = newUser(data)
    if(push){
        res.send(true)
    }else{
        res.send(false)
    }
 } catch (error) {
    console.error(error)
    res.send(false)
 }

 
})

auth.post('/login', (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        //if (err) throw err;
        if (!user) res.send(404, "No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            //res.send("Successfully Authenticated");
            res.redirect(200, 'http://localhost:3000/consola')
          });
        }
      })(req, res, next);
})

auth.post('/logout', (req, res) => {

})