//----------------------------MODULOS----------------------------
const fs = require('fs')
const config = require('./config.js')
const express = require('express');
const { Server: HttpServer } = require('http')
const router = express.Router();
const info = express.Router();
const random = express.Router();
const bodyParser = require('body-parser');
//instancia express
const app = express();
const httpServer = new HttpServer(app)
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
const session = require('express-session');
const { reset } = require('nodemon');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

//----------------------------FACEBOOK SESSION----------------------------
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "https://localhost:8080/auth/facebook/callback"
},
function (accessToken, refreshToken, profile, done){
    User.findOrCreate(profile.id, function(err, user){
        if(err){ return done(err);}
        done(null, user);
        })
    }
));

//rutas de auth
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/',
                                        failureRedirect: '/'}));

//----------------------------SESSION----------------------------
app.use(session ({
/*
    store: MongoStore.create({
        mongoUrl: 'mongodb://'+ process.env.USERBD +':'+ process.env.PASSDB +'@cluster0-shard-00-00.6xxqq.mongodb.net:27017,cluster0-shard-00-01.6xxqq.mongodb.net:27017,cluster0-shard-00-02.6xxqq.mongodb.net:27017/session?ssl=true&replicaSet=atlas-nr9qdl-shard-0&authSource=admin&retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: '45ADH45',
    resave: false,
    saveUninitialized: false*/
}))

//----------------------------RUTAS----------------------------
//RANDOM
app.use('/random', random)

app.post('/', (req,res) => {
    const cant = req.body.cant
    let dev = []
    if(cant = NULL){
        for (let index = 0; index < 100000000; index++) {
            dev.push(Math.random(1,1000))
        }
    }else{
        for (let index = 0; index < cant; index++) {
            dev.push(Math.random(1,1000))
        }
    }
    res.send(cant)
})

//INFO
app.use('/info', info)

router.get('/', (req, res) => {
    res.send(`plataforma: `+process.platform+      
        `nodejs v:`+ process.version+
        `memPool: `+process.memoryUsage()+
        `title: `+process.title+
        `PID: `+process.pid+
        `dir: `+process.cwd())
})




//PRODUCTOS
app.use('/', router);

router.get('/login', (req, res) => {
const {username, password } = req.query;
if (username !== 'admin' || password !== 'admin') {
    return res.send('login failed')
  }
 
req.session.user = username
req.session.admin = true
res.send(`bienvenido ${username}`);
});


router.get('/logout', (req, res) => {
    let username = req.session.user
   req.session.destroy(err => {
       if(err){
           return res.json({status: 'logout err', body: err})
       }
       res.send(`adios ${username}`)
   })
    });
    

//----------------------------SERVER----------------------------
const PORT = 8080;
httpServer.listen(PORT, () => console.log('Server on!'))