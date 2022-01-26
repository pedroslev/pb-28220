const fs = require('fs');
const express = require('express');
const { RSA_NO_PADDING } = require('constants');
const { title } = require('process');
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

class Producto{
    constructor(id,title, price, thumnail){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumnail = thumnail
    }
}

function newProd(title, price, thumnail){
    //retorno la creacion del producto con un id cualquiera, ya que el metodo save reasignara el mismo
    return new Producto(undefined,title, price, thumnail);
}

app.get('/api/productos', (req, res) => {
    try {
        //leemos el archivo
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        res.end(data);
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})

app.get('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){return res.send({error: 'El parametro ingresado no es un numero'})}
    try {
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        data = JSON.parse(data)
        if(id > data.length){return res.send({error: 'El parametro ingresado esta fuera de rango'})}
        res.end(JSON.stringify(data[id]))
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})

app.post('/api/productos', (req, res) => {
    title = req.body.title;
    price = req.body.price;
    thumnail = req.body.thumnail;
    try {
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        data = JSON.parse(data)
        let id = data.length
        let newProd = newProd(id, title, price, thumnail)
        data.push(newProd)
        fs.promises.writeFile('./storage/storage.json', JSON.stringify(data, null, 2))
        res.end(JSON.stringify(newProd))
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})

app.put('api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){return res.send({error: 'El parametro ingresado no es un numero'})}
    try {
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        data = JSON.parse(data)
        if(id > data.length){return res.send({error: 'El parametro ingresado esta fuera de rango'})}
        data[id].title = req.body.title;
        data[id].price = req.body.price;
        data[id].thumnail = req.body.thumnail;
        fs.promises.writeFile('./storage/storage.json', JSON.stringify(data, null, 2))
        res.end('Producto actualizado con exito')
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})

app.delete('/api/productos/:id', (req, res) => {
try {
    const id = parseInt(req.params.id)
    let data = fs.readFileSync('./storage/storage.json', 'utf-8')
    data = JSON.parse(data)
    data = data.filter(data => data.id != id)
    fs.promises.writeFile('./storage/storage.json', JSON.stringify(data, null, 2))
    res.end('Producto eliminado con exito')
} catch (error) {
    console.error('Ha ocurrido un error inesperado: ' + error)
}
})


//express server
const server = app.listen(PORT, () => {
    console.log(`Server http escuchando en puerto ${server.address().port}`)
}) 

server.on("error", error => console.log('error on server: ' + error))