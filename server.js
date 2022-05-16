//----------------------------MODULOS----------------------------
//server
const express = require('express');
const { Server: HttpServer } = require('http')
//logger
const log4js = require('log4js');
//routes
const auth = express.Router();
const status = express.Router();
const cart = express.Router();
const bodyParser = require('body-parser');
//mongo db requirements
const mongoose = require('mongoose')
const { Schema } = mongoose;
//md5 encrypter for password
const md5 = require('blueimp-md5')
//auth w/ passport
const passport = require('passport')
const LocalStrategy = require('passport-local')
var crypto = require('crypto');
//sessiones
const session = require('express-session');
const { Cookie } = require('express-session');
//gmail
const nodemailer = require('nodemailer');

//instancia express
const app = express();
const httpServer = new HttpServer(app)

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

//Mailer

//INGRESAR SU MAIL PARA PROBAR.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'ingresarmail@gmail.com',
        pass: 'password'
    }
 });


//----------------------------Mongo DB----------------------------
//conect with mongodb 
try {
    mongoose.connect('mongodb+srv://pbadmin:pbpassword@pb-28220.5wbn1.mongodb.net/PB-28220?retryWrites=true&w=majority')
} catch (error) {
    loggerError.error(` BBDD ||Ha ocurrido un error al conectar con la base de datos  || ${error}`)
}

//SCHEMAS
const userSchema = new Schema ({email: String, password: String, nombre: String, edad: Number, telefono: Number })
userSchema.path('_id');

const cartSchema = new Schema ({email: String, producto: String, precio: String})
userSchema.path('_id');

//MODELS
const users = mongoose.model('users', userSchema)
const carts = mongoose.model('carts', cartSchema)
//----------------------------Passport-local----------------------------
passport.use(new LocalStrategy(
    function(username, password, done) {
      users.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != md5(password)) { return done(null, false); }
        passport.serializeUser(function(user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function(user, done) {
            done(null, user);
          });
        return done(null, user);
      });
    }
  ));

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


//----------------------------RUTAS----------------------------
//status route
app.use('/api/status', status)

status.get('/dbconnection', (req, res) => {
switch (mongoose.connection.readyState) {
    case 0:
        res.send(`DISCONNECTED`)
    break;

    case 1:
        res.send(`CONNECTED`)
    break;

    case 2:
        res.send(`CONNECTING`)
    break;

    case 3:
        res.send(`DISCONNECTING`)
    break;

    default:
        break;
}
})

//cart route
app.use('/api/cart', cart)

cart.post('/addtocart', (req, res) => {
    console.log(sessions.user)
    console.log(req.body)
    let addingItem = {
        email: sessions.user,
        producto: req.body.producto,
        precio: req.body.precio
    }
    const pusher2 = new carts(addingItem)
    pusher2.save();
    res.status("200")
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
                try {
                    const info = transporter.sendMail(mailOptions)
                } catch (error) {
                    loggerError.error(`Ha ocurrido un error al enviar el mail de carrito: ${error}`)
                }
            }
        })
    
    
     res.send(console.log(result))
})

//authentication route
app.use('/api/auth', auth)

auth.post('/register', (req, res) => {
 let newuser = {
    email: req.body.email,
    password: md5(req.body.password),
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    edad: req.body.edad,
    telefono: req.body.telefono
 }
 const pusher = new users(newuser)
 pusher.save();
 res.redirect('/ecommerce')

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

//----------------------------SERVER----------------------------
const PORT = 8080;
httpServer.listen(PORT, () => console.log('Server on!'))