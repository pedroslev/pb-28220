//mongo db requirements
import mongoose from 'mongoose';
const { Schema } = mongoose;
//md5 encrypter for password
import md5 from 'blueimp-md5';
//auth w/ passport
import passport from 'passport';
import LocalStrategy from 'passport-local'
import sessions from './server.js'


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



//----------------------------FUNCTIONS----------------------------
let addToCart = (obj) => {
    try {
        const pusher2 = new carts(obj)
        pusher2.save();
        return true;
    } catch (error) {
        return error;
    }
}

let newUser = (data) => {
    try {
        const pusher = new users(data)
        pusher.save();
        return true;
    } catch (error) {
        return error;
    }
}

export{
    newUser,
    addToCart,
    passport,
}