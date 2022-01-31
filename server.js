//----------------------------MODULOS----------------------------
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

//instancia express
const app = express();


//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
router.use(express.json())
app.use(express.static('public'))

//----------------------------RUTAS----------------------------
//PRODUCTOS
app.use('/api/productos', router);
let productos = [];
router.get('/', (req, res) => {
    res.json(productos);
});

router.post('/', (req, res) => {
    let producto = {
        id: productos.length + 1,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    productos.push(producto);
    console.log(producto)
    res.json(producto)
})


//----------------------------SERVER----------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`server up on port ${PORT}`);
})
server.on('error', error => {
    console.error(`Error bringing up the proyect ${error}`);
})

