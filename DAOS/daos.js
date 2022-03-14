import mongoose from 'mongoose';



//----------------------------DB's----------------------------
//sqlite for mensajes
const sqlite = require('knex')({
    client: 'better-sqlite3',
    connection: {filename: './DB/ecommerce.sqlite'},
    useNullAsDefault: true
})

//table creation of mensajes sqlite3
//needed only once
/*
sqlite.schema.createTable('mensajes', table => {
        table.increments('id')
        table.varchar('email'),
        table.varchar('mensaje')
    })
    .then(() => console.log(`table mensajes created`))
    .catch((err) => {console.log(`Unexpected Creating table Error: ${err}`)})
  */

//mariaDB(mysql) for productos :)
const mariadb = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'admin',
        password: 'addme',
        database: 'ecom'
    },
    pool: {min: 0, max:7}
})

//crud en mongo
CRUD()
async function CRUD(){
    try {
        const URL = 'mongodb://root:example@localhost:27017/ecommerce'
        let rta = await mongoose.connect(URL, {
            userNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('base de datos conectada')
    } catch (error) {
        console.log(`Ha ocurrido un error:` + error)
    }
}


//firebase
var admin = require("firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
