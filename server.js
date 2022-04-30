//----------------------------MODULOS----------------------------
const express = require('express');
const log4js = require('log4js');
const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const info = express.Router();
const bodyParser = require('body-parser');
const compression = require('compression')


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
    const app = express();
app.use(compression())

log4js.configure({
    appenders: {
        LoggerConsole: {type: 'console'},
        LoggerFileWarning: {type: 'file', filename: './log/warn.log'},
        LoggerFileError: {type: 'file', filename: './log/error.log'}
    },
    categories:{
        default: {appenders: ["LoggerConsole"], level: "trace"},
        consola: {appenders: ["LoggerConsole"], level: "debug"},
        error: {appenders: ["LoggerFileError"], level: "info"},
        warning: {appenders: ["LoggerFileWarning"], level: "warn"},
        todos: {appenders: ["LoggerConsole", "LoggerFileWarning", "LoggerFileError"], level: "error"}
    }
})
const loggerInfo = log4js.getLogger('default')
const loggerWarn = log4js.getLogger('warn')
const loggerError = log4js.getLogger('err')

//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
const { reset } = require('nodemon');


//----------------------------RUTAS----------------------------
//INFO
app.use('/info', info)

info.get('/', (req, res) => {
    loggerInfo.info(`se ha requerido: `+req)
    try {
        res.send(`plataforma: `+process.platform+      
        `nodejs v:`+ process.version+
        `memPool: `+process.memoryUsage()+
        `title: `+process.title+
        `PID: `+process.pid+
        `dir: `+process.cwd())    
    } catch (error) {
     loggerError.error(error)
    }
    
        
})

app.use(function(req, res) {
    loggerWarn.warn(`se ha requerido: `+req)
          res.json({
            error: {
              'name':'Error',
              'status':404,
              'message':'Invalid Request',
              'statusCode':404,
              'stack':'http://localhost:8080/'
            },
             message: 'Testing!'
          });
    });

    app.listen('8080', () => {
        loggerInfo.log('server express levantado en 8080')
        loggerInfo.log(`PID ${process.pid}`)
    })
}



//----------------------------SERVER----------------------------
const PORT = 8080;
//httpServer.listen(PORT, () => console.log('Server on!'))