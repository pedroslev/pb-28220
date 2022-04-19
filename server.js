//----------------------------MODULOS----------------------------
const fs = require('fs')
const config = require('./config.js')
const express = require('express');
const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const info = express.Router();
const random = express.Router();
const bodyParser = require('body-parser');
//instancia express
const app = express();
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
const { reset } = require('nodemon');


//----------------------------RUTAS----------------------------
//RANDOM
app.use('/random', random)

random.post('/', (req,res) => {
    const cant = req.body.cant
    let dev = []
    if(cant = NULL){
        for (let index = 0; index < 100000000; index++) {
            dev.push(Math.random(1,1000))
        }
    }else{
        for (let index = 0; index < cant; index++) {
            dev.push(Math.random(1,1000))
        }
    }
    res.send(cant)
})

//INFO
app.use('/info', info)

info.get('/', (req, res) => {
    res.send(`plataforma: `+process.platform+      
        `nodejs v:`+ process.version+
        `memPool: `+process.memoryUsage()+
        `title: `+process.title+
        `PID: `+process.pid+
        `dir: `+process.cwd())
})




//----------------------------CLUSTER----------------------------
if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`)
    //fork workers
    for (let index = 0; index < numCPUs; index++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code ,signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
}else{
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('hello world');
    }).listen(8080)
    console.log(`worker ${process.pid} started`)
}



//----------------------------SERVER----------------------------
const PORT = 8080;
//httpServer.listen(PORT, () => console.log('Server on!'))