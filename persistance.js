const mongoose = require('mongoose')
const { Schema } = mongoose;


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
  
  let connection = mongoconeccion.connect()