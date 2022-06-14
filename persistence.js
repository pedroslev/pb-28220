//mongo db requirements
import mongoose from 'mongoose';
const { Schema } = mongoose;
//md5 encrypter for password
import md5 from 'blueimp-md5';
//auth w/ passport
import passport from 'passport';
import LocalStrategy from 'passport-local'
import sessions from './server.js'

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import crypto from 'crypto';


//----------------------------Mongo DB----------------------------
//conect with mongodb DAO
class MongoClient{
  constructor(){
    //super()
    this.connected= false;
    this.client= mongoose;
  }

  async connect(){
    try {
      this.client.connect('mongodb+srv://pbadmin:pbpassword@pb-28220.5wbn1.mongodb.net/PB-28220?retryWrites=true&w=majority')
      this.connect = true
  } catch (error) {
      loggerError.error(` BBDD ||Ha ocurrido un error al conectar con la base de datos  || ${error}`)
  }
  }

  async save(data){
    try {
      data.save()
    } catch (error) {
      return error;
    }
  }

}
let mongoconeccion = new MongoClient

mongoconeccion.connect()

//SCHEMAS
const userSchema = new Schema ({email: String, password: String, nombre: String, edad: Number, telefono: Number })
userSchema.path('_id');

const cartSchema = new Schema ({email: String, producto: String, precio: String})
userSchema.path('_id');

const testSchema = new Schema ({value: String})
testSchema.path('_id')

//MODELS
const users = mongoose.model('users', userSchema)
const carts = mongoose.model('carts', cartSchema)
const tests = mongoose.model('tests', testSchema)


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



//----------------------------GraphQL----------------------------
const schema = buildSchema(`

type Number {
  id: ID!
  value: Int
}

input value {
  value: Int
}

type Query{
  insertValue(value: value): Number,
  getValue(id: ID!): Number
}

type Mutation {
  modifyValue(datos: value): Number,
  deleteValue(): value
}
`)

class Number{
  constructor(id, value)
}

const valueMap = 0;

function getValue(){
  try {
    let result = tests.find();
    return result;
  } catch (error) {
    console.error(error)
  }
}

function modifyValue(value){
  let prev = tests.find();
  tests.delete(prev._id)
  let newvalue = new tests(value)
  newvalue.save();
}

function insertValue(value){
  let prev = tests.find();
  tests.delete(prev._id)
  let newvalue = new tests(value)
  newvalue.save();
}

function deleteValue(){
  let prev = tests.find();
  tests.delete(prev._id)
}

//----------------------------FUNCTIONS----------------------------
let addToCart = (obj) => {
    try {
        const pusher2 = new carts(obj)
        pusher2.save(pusher2)
        return true;
    } catch (error) {
        return error;
    }
}

let newUser = (data) => {
    try {
        const pusher = new users(data)
        pusher.save(pusher)
        return true;
    } catch (error) {
        return error;
    }
}

let getTest = () => {
  try {
    let result = tests.find();
    return result;
  } catch (error) {
    console.error(error)
  }
}

let modInsertTest = (value) => {
  let prev = tests.find();
  tests.delete(prev._id)
  let newvalue = new tests(value)
  newvalue.save();
}

let deleteTest = () => {
  let prev = tests.find();
  tests.delete(prev._id)
}


export{
    newUser,
    addToCart,
    passport,
    deleteTest,
    modInsertTest,
    getTest,
    deleteValue,
    insertValue,
    modifyValue,
    getValue,
    graphqlHTTP
}