//----------------------------MODULOS----------------------------
//server
import express from 'express'
import session from 'express-session';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local'


//routers
import { statusApp, cart, auth, prods } from './routes.js'

//persistance
import { users } from './persistence.js'

//parser
import bodyParser from 'body-parser';

//instancia express
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(
    session({
        secret: "pb-28220",
        resave: true,
        saveInitialized: true
    }))
app.use(cookieParser("pb-28220"))
app.use(passport.initialize());
app.use(passport.session())

//----------------------------Passport-local----------------------------
passport.use(
    new LocalStrategy((email, password, done) => {
        users.findOne({ email: email }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          if(password !== user.password){
            return done(null, false);
          }else{
            return done(null, user);
          }
        });
      })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
      });
      passport.deserializeUser((id, cb) => {
        users.findOne({ _id: id }, (err, user) => {
          const userInformation = {
            email: user.email,
          };
          cb(err, userInformation);
        });
      });

//----------------------------RUTAS----------------------------
//status route
app.use('/api/status', statusApp)
//cart route
app.use('/api/cart', cart)
//authentication route
app.use('/api/auth', auth)
//prods route
app.use('/api/prods', prods)



export{
    passport,
    app
}

//----------------------------SERVER----------------------------
const PORT = 8080;
const Server = app.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${PORT}`)
})
Server.on('error', error => console.error(`Error en el servidor`, error))