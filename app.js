const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa();

//body parser middleware
app.use(koaBody());


//getting routers on sub route
let statusApp = require('./status.js')


app.use(statusApp.routes());


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor de Koa: ${error}`))