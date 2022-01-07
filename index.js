const fs = require('fs');
   
function deleteById(id){}
function deleteAll(){}

class Contenedor{
    constructor(file){
        this.file = file;
    }

    async save(object){
        try {
            //leemos el archivo
            let data = fs.readFileSync('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, 'utf-8')
            //validamos si esta vacio
            if(data == ''){
                //declaramos data como array
                data = []
                //ponemos el id en 0 para que sea el primero
                object.id = 0;
                //pusheamos nuestro nuevo objeto a ingresar en el archivo
                data.push(object)
            }else{
                //parseamos nuestra lectura de archivo
                data = JSON.parse(data)
                let newid = data[data.length -1].id + 1
                object.id = newid
                //pusheamos a nuestro objeto data el nuevo object recibido por params
                data.push(object)
            }
            //escribimos nuestro archivo
            await fs.promises.writeFile('/home/pedro/Downloads/Pedro/pb-28220/storage'+this.file, JSON.stringify(data, null, 2))
        } catch (error) {
            console.error('Ha ocurrido un error inesperado: ' + error)
        }
    }

    getById(id){
        try {
            //leemos el archivo
            let data = fs.readFileSync('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, 'utf-8');
            data = JSON.parse(data);
            return data[id]
        } catch (error) {
            console.error('Ha ocurrido un error inesperado: ' + error)
        }
    }

    getAll(){
        try {
            //leemos el archivo
            let data = fs.readFileSync('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, 'utf-8')
            data = JSON.parse(data);
            return data;
        } catch (error) {
            console.error('Ha ocurrido un error inesperado: ' + error)
        }
    }

    deleteById(id){
        try {
        //leemos el archivo
        let data = fs.readFileSync('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, 'utf-8');
        data = JSON.parse(data);
        data = data.filter(data => data.id != id)
        //escribimos nuestro archivo
        fs.promises.writeFile('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, JSON.stringify(data, null, 2))
        console.log('El producto de id ' + id + 'ha sido borrado con exito')
        } catch (error) {
            console.error('Ha ocurrido un error inesperado: ' + error)
        }
    }

    deleteAll(){
        try {
            fs.promises.writeFile('/home/pedro/Downloads/Pedro/pb-28220/storage/'+this.file, JSON.stringify(data, null, 2))
        } catch (error) {
            console.error('Ha ocurrido un error inesperado: ' + error)
        }
    }
    
}

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


let product1 = newProd('manteca', 200, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.laserenisimavaatucasa.com.ar%2Fproducto%2Fmanteca-multidefensas-la-serenisima-200-gr%2F&psig=AOvVaw16XIj-HUiBhse9eyY5ODZh&ust=1641654611046000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDH1JH2n_UCFQAAAAAdAAAAABAD')
let file1 = new Contenedor('storage.json')


//No deben ser ejecutadas una tras otra ya que la sincronia fallara
//test run
//file1.save(product1);
//file1.getById(3);
//file1.getAll();
//file1.deleteById(7);
//file1.deleteAll();