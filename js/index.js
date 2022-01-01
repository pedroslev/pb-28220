//clase Usuario
class Usuario{
 constructor (nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [{}];
    this.mascotas = [] ;
}  
getFullName(){
    console.log(`${user1.nombre} ${user1.apellido}`)
}

addMascota(nuevaMascota){
    user1.mascotas.push(nuevaMascota)
}

countMascotas(){
    console.log(user1.mascotas.length)
}

//addBook('Analisis Tecnico de los Mercados Financieros', 'Murphy')
addBook(titulo, autor){
user1.libros.push(new libros(titulo, autor))
}

getBookNames(){
    let titulos = []
    for (let index = 0; index < user1.libros.length; index++) {
        titulos[index] = user1.libros[index].titulo   
    }
  
    console.log(titulos);
}

}
class libros{
    constructor(titulo, autor){
        this.titulo = titulo;
        this.autor = autor;
    }
}

//let librosuser1 = new libros('Analisis Tecnico de los Mercados Financieros', 'Murphy')
let librosuser1 = {titulo:'Analisis Tecnico de los Mercados Financieros', autor:'Murphy'}
console.log(librosuser1)
let user1 = new Usuario('pedro', 'lopez slevin', librosuser1, 'perro');

//test
user1.getFullName();
user1.addMascota('gato');
user1.countMascotas();
user1.addBook('Cronicas Marcianas', 'Ray Bradbury');
user1.getBookNames();