const Router = require('koa-router')
const mongo = require('./persistance.js')

const router = new Router({
    prefix: '/api/status'
})


router.get('/status', ctx => {

    switch (mongo.connection) {
        case 0:
            return(`DISCONNECTED`)
        break;
    
        case 1:
            return(`CONNECTED`)
        break;
    
        case 2:
            return(`CONNECTING`)
        break;
    
        case 3:
            return(`DISCONNECTING`)
        break;
    
        default:
            break;
    }
})