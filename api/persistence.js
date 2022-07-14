
//mongo db requirements
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const { Schema } = mongoose;

dotenv.config()


//----------------------------Mongo DB----------------------------
const dbConex = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.CONNECTION_STRING}/?retryWrites=true&w=majority`)
}
dbConex();


//----------SCHEMAS
const userSchema = new Schema ({email: String, password: String, nombre: String, edad: Number, telefono: Number })
userSchema.path('_id');

const prodSchema = new Schema({producto: String, categoria: String, imagen: String, price: Number})
prodSchema.path('_id');

const messageSchema = new Schema({timestamp: String, user: String, msj: String})
prodSchema.path('_id');

const cartSchema = new Schema ({email: String, id: String, producto: String, price: Number, cantidad: Number})
userSchema.path('_id');

const categorySchema = new Schema({categoria: String})
categorySchema.path('_id');

const orderSchema = new Schema({ cart: Object , orderN: Number, timestamp: String, status: String, user: String})
categorySchema.path('_id');

//----------MODELS
const users = mongoose.model('users', userSchema)
const carts = mongoose.model('carts', cartSchema)
const categories = mongoose.model('categories', categorySchema)
const products = mongoose.model('products', prodSchema)
const messages = mongoose.model('mensajes', messageSchema)
const orders = mongoose.model('ordenes', orderSchema)



//----------------------------FUNCTIONS----------------------------
let addMsj = (msj) => {
    const pusher = new messages(msj)
    pusher.save()
}

let addToCart = (obj) => {
    try {
        const pusher = new carts(obj)
        pusher.save()
        return true;
    } catch (error) {
        return error;
    }
}

let eraseCart = (user) => {
    carts.deleteMany({email: user})
    .then((resp) => {return resp.acknowledged})
}

let removeFromCart = (idprod, user) => {
    try {
        carts.deleteOne({email: user, id: idprod})
        .then((response) => {
            return response.acknowledged
        })
    } catch (error) {
        return false
    }
}

let deleteFromProds = (id) => {
    try {
        products.deleteOne({ _id: id})
        .then((resp) => {
            return resp.acknowledged
        })
    } catch (error) {
        return false
    }
}

let addCategory = (cat) => {
    try {
        categories.findOne({categoria: cat.categoria})
        .then((response) => {
            if(!response){
                const pusher = new categories(cat)
                pusher.save()
                return true
            }
        })
    } catch (error) {
        return error
    }
}

let modifyDBProd = (obj) => {
    products.updateOne({_id: obj._id} , {$set: 
    {
        producto: obj.producto,
        categoria: obj.categoria,
        imagen: obj.imagen,
        price: obj.price 
    }})
    .then((resp) => {
        return resp.acknowledged
    })
}

let newProd = (obj) => {
    try {
        const pusher = new products(obj)
        pusher.save();
        return true;
    } catch (error) {
        return false;
    }
}

let newUser = (data) => {
    try {
        users.findOne({email: data.email})
        .then( (response) => {
            if(!response){
              const pusher = new users(data)
              pusher.save();
              return true;
            }else{return false}
        })
        
    } catch (error) {
        return error;
    }
}


export{
    newUser,
    addToCart,
    carts,
    users,
    addCategory,
    categories,
    products,
    newProd,
    removeFromCart,
    deleteFromProds,
    modifyDBProd,
    addMsj,
    orders,
    eraseCart
}