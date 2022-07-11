//Router
import { Router } from 'express'
//gmail
//import nodemailer from 'nodemailer'
import mongoose from 'mongoose';

//import SendmailTransport from 'nodemailer/lib/sendmail-transport';

import { newUser, addCategory, categories, newProd, products, addToCart, carts} from './persistence.js';

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
let push = addToCart(req.body)
res.send(push)
})

cart.get('/', async (req, res) =>{
    let result = await carts.find({email: req.user.email})
    res.send(result)
    
    
})

cart.get('/cartsender', (req, res) => {

})
//------------------PRODUCTS

prods.post('/category', (req, res) => {
    let push = addCategory(req.body)
    if(push){res.send(true)}
    else{res.send(false)}
})

prods.get('/category', (req, res) => {
    categories.find()
    .then((result)=> {
        let cataux = []
        for (let index = 0; index < result.length; index++) {
            cataux.push(result[index].categoria)
        }
        res.send(cataux)
    })
})

prods.post('/', (req, res) => {
    newProd(req.body)
})

prods.get('/', (req, res) => {
    products.find({})
    .then((result) => {
        res.send(result)
    })
})

//------------------ATHENTICATION
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
    try {
        req.session.destroy()    
        res.send(true)
    } catch (error) {
        res.send(false)
    }
})