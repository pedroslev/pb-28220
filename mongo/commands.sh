#docker bash exec
#docker exec -ti mongo_mongo_1 bash
mongo
use admin
#simple auth
db.auth("root", "example")
#db creation
use ecommerce
##1 y 2------insert productos
db.productos.insert({title:'shampoo', price:120, thumbnail:'https://www.google.com/shampoo'})
db.productos.insert({title:'deshodorante', price:580, thumbnail:'https://www.google.com/deshodorante'})
db.productos.insert({title:'Agua Oxigenada', price:900, thumbnail:'https://www.google.com/aguaoxigenada'})
db.productos.insert({title:'Fernet', price:1280, thumbnail:'https://www.google.com/fernet'})
db.productos.insert({title:'Chocolate', price:1700, thumbnail:'https://www.google.com/chocolate'})
db.productos.insert({title:'Manteca', price:2300, thumbnail:'https://www.google.com/manteca'})
db.productos.insert({title:'Salchicas', price:2860, thumbnail:'https://www.google.com/salchichas'})
db.productos.insert({title:'Manzanas', price:3350, thumbnail:'https://www.google.com/manzanas'})
db.productos.insert({title:'Peras', price:4320, thumbnail:'https://www.google.com/peras'})
db.productos.insert({title:'Melon', price:4990, thumbnail:'https://www.google.com/melon'})
##insert mensajes
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'hola'})
db.mensajes.insert({usuario:'coder@gmail.com', timestamp: ISODate(), mensaje:'hola'})
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'como estas?'})
db.mensajes.insert({usuario:'coder@gmail.com', timestamp: ISODate(), mensaje:'bien vos?'})
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'bien.'})
db.mensajes.insert({usuario:'coder@gmail.com', timestamp: ISODate(), mensaje:'Bueno, nos vemos'})
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'si tal cual, tengo que ir al super'})
db.mensajes.insert({usuario:'coder@gmail.com', timestamp: ISODate(), mensaje:'yo a programar para la entrega'})
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'ah ok'})
db.mensajes.insert({usuario:'coder@gmail.com', timestamp: ISODate(), mensaje:'chau'})
db.mensajes.insert({usuario:'pedro@gmail.com', timestamp: ISODate(), mensaje:'chau'})
##3------listar
db.productos.find()
db.mensajes.find()
##4------Contar
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()
##5------Agregar prod
##a
db.productos.insert({title:'naranjas', price:5000, thumbnail:'https://www.google.com/naranjas'})
##b
#i
db.productos.find({"price": {$lt: 1000}})
#ii
db.productos.find({"price": {$in: [1000, 3000]}})
#iii
db.productos.find({"price": {$gt: 3000}})
#iv
db.productos.find().sort({price: 1})[3]
#C
db.productos.update({},{$set:{"stock": 100}}, {upsert:false, multi: true})
#D
db.productos.update({"price": {$gt: 4000}}, {$set: {"stock": 0}})
#E
db.productos.deleteMany({"price": {$lt: 1000}})
#6
db.createUser({user: 'pepe', pwd: 'asd456', roles:[{role:'read', db: 'ecommerce'}]})
