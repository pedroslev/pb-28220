//----------------------------MODULOS----------------------------
const fs = require('fs')
const express = require('express');
const { Server: HttpServer } = require('http')
const router = express.Router();
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
    clientID: 351979223622992,
    clientSecret: 'fedfbc6085c8cb9725023da044220018',
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

    store: MongoStore.create({
        mongoUrl: 'mongodb://coderuser:coderpass@cluster0-shard-00-00.6xxqq.mongodb.net:27017,cluster0-shard-00-01.6xxqq.mongodb.net:27017,cluster0-shard-00-02.6xxqq.mongodb.net:27017/session?ssl=true&replicaSet=atlas-nr9qdl-shard-0&authSource=admin&retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: '45ADH45',
    resave: false,
    saveUninitialized: false
}))

//----------------------------RUTAS----------------------------
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