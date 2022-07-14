//Router
import { Router } from 'express'
import mongoose from 'mongoose';

//import SendmailTransport from 'nodemailer/lib/sendmail-transport';

import { newUser, addCategory, categories, newProd, products, eraseCart, orders, removeFromCart, addToCart, carts, deleteFromProds, modifyDBProd} from './persistence.js';

import { passport } from './server.js';

//IMPORTS
import {getDBState} from './service.js'

import {sendMail} from './controllers.js'


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

//------------------STATUS GENERIC
statusApp.get('/dbconnection', (req, res) => {
let status = getDBState(mongoose.connection.readyState);
res.send(status)
})

//------------------CART
cart.post('/addtocart', (req, res) => {
let push = addToCart(req.body)
res.send(push)
})

cart.get('/', async (req, res) =>{
    let result = await carts.find({email: req.user.email})
    res.send(result)    
})

cart.delete('/:user/:id', (req, res) => {
    const idprod = req.params.id
    const user = req.params.user
    let deleted = removeFromCart(idprod, user)
    if(deleted){res.send(true)}
    else{res.send(false)}
})


cart.post('/order', (req, res) => {

    orders.count()
    .then((count) => {
        let order = {
            cart: req.body,
            orderN: count,
            timestamp: Date().toString(),
            status: 'generada',
            user: req.user.email}

        const pusher = new orders(order)
        pusher.save()
        sendMail(req.user.email,'Compra',`Se ha registrado tu orden de compra N${count}`)
        })
        eraseCart(req.user.email)
        res.send('orden generada')

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

prods.get('/:categoria', (req, res) => {
    products.find({categoria: req.params.categoria})
    .then((result) => {
        res.send(result)
    })
})

prods.get('/:_id', (req, res) => {
    console.log(req.params._id)
    products.findById(req.params._id)
    .then((result) => {
        res.send(result)
    })
})

prods.put('/modify', (req,res) => {
    let mod = modifyDBProd(req.body)
    res.send(mod);
    
})

prods.delete('/delete/:id', (req, res) => {
    const idprod = req.params.id
    let deleted = deleteFromProds(idprod)
    if(deleted){res.send(true)}
    else{res.send(false)}
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
        sendMail(data.email, 'registracion exitosa', 'Muchas gracias por registrarse en pb-28220!')
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