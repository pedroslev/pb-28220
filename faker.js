//faker
import faker from 'faker';
faker.locale='es';
export function generarProductos(id){
    return{
        id,
        title: faker.title.findName(),
        price: faker.price.food(),
        thumbnail: faker.title.number(),
    }
}