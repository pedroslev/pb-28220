//----------------------------MODULOS----------------------------
const fs = require('fs')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
//handlebars
const exphbs = require('express-handlebars');
const path = require('path');
const ejs = require('ejs')

//instancia express
const app = express();


//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
router.use(express.json())
app.use(express.static('public'))
app.use(express.static('views'))

//----------------------------PLANTILLAS----------------------------
//-------------HANDLEBARS
//CONFIGURACION DE HANDLEBARS
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}))
//HANDLEBARS:
app.set('view engine', 'hbs');

//------------------------------------------------------------------

//-------------PUG
//config
//app.set('views', path.join('views'))
//app.set('view engine', 'pug');

//------------------------------------------------------------------
//-------------EJS
//config
//app.set('views', path.join('views'))
//app.set('view engine', 'ejs');


//FUNCIONALIDAD
app.engine('html', async (filePath, options, callback)=>{
    try {
     const contenido = await fs.promises.readFile(filePath);
     const htmlGenerado = contenido.toString()
                                    .replace('$$id$$', options.id)
                                    .replace('$$title$$', options.title)
                                    .replace('$$price$$', options.price)
                                    .replace('$$thumbnail$$', options.thumbnail);
    
     callback(null, htmlGenerado)
    } catch (error) {
        callback(new Error(error), null)
    }
})

//FIN HANDLEBARS



//----------------------------RUTAS----------------------------
//PRODUCTOS
app.use('/api/productos', router);
let productos = [];

router.get('/', (req, res) => {
    if(productos.length===0){res.send('no hay productos')}else{
        res.json(productos);
    //res.render('plantilla', productos)
    }
});

router.post('/', (req, res) => {
    let producto = {
        id: productos.length + 1,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    productos.push(producto);
    console.log(producto);
    //HANDLEBARS
    res.render('plantilla', producto)
    //PUG and EJS
    //res.render('index', producto)
})


//----------------------------SERVER----------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`server up on port ${PORT}`);
})
server.on('error', error => {
    console.error(`Error bringing up the proyect ${error}`);
})

