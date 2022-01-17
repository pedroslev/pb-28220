const fs = require('fs');
const express = require('express');
const PORT = 8080;
const app = express();

app.get('/productos', (req, res) => {
    try {
        //leemos el archivo
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        res.end(data);
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})

app.get('/productoRandom', (req, res) => {
    try {
        let data = fs.readFileSync('./storage/storage.json', 'utf-8')
        data = JSON.parse(data)
        let randomixer = data.length + 1;
        let position = Math.floor(Math.random() * (randomixer - 0) + 0);
        res.end(JSON.stringify(data[position]))
    } catch (error) {
        console.error('Ha ocurrido un error inesperado: ' + error)
    }
})


const server = app.listen(PORT, () => {
    console.log(`Server http escuchando en puerto ${server.address().port}`)
}) 

server.on("error", error => console.log('error on server: ' + error))