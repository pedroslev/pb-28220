
//mongo db requirements
import mongoose from 'mongoose';
const { Schema } = mongoose;
//import { ExportConfigurationList } from 'twilio/lib/rest/bulkexports/v1/exportConfiguration';



//----------------------------Mongo DB----------------------------
const dbConex = async () => {
  await mongoose.connect('mongodb+srv://pbadmin:pbpassword@pb-28220.h3n5d.mongodb.net/?retryWrites=true&w=majority')
}
dbConex();


//----------SCHEMAS
const userSchema = new Schema ({email: String, password: String, nombre: String, edad: Number, telefono: Number })
userSchema.path('_id');

const cartSchema = new Schema ({email: String, producto: String, precio: String})
userSchema.path('_id');

//----------MODELS
const users = mongoose.model('users', userSchema)
const carts = mongoose.model('carts', cartSchema)




//----------------------------FUNCTIONS----------------------------
let addToCart = (obj) => {
    try {
        const pusher = new carts(obj)
        pusher.save()
        return true;
    } catch (error) {
        return error;
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
}