//clase Usuario
class Usuario{
 constructor (nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [] ;
 }  
}

class libros{
    constructor(titulo, autor){
        this.titulo = titulo;
        this.autor = autor;
    }
}

const user1 = new Usuario('pedro', 'lopez slevin', 'Analisis Tecnico de los Mercados Financieros','maggie')
function getFullName(){
    console.log(`${user1.nombre} ${user1.apellido}`)
}


function addMascota(nuevaMascota){
    user1.mascotas.push(nuevaMascota)
}

function countMascotas(){
    console.log(user1.mascotas.length)
}

//test run :)
//addBook('Analisis Tecnico de los Mercados Financieros', 'Murphy')
function addBook(titulo, autor){
user1.libros.push(new libros(titulo, autor))
}

function getBookNames(){
    let titulos = []
    for (let index = 0; index < user1.libros.length; index++) {
        titulos[index] = user1.libros[index].titulo   
    }
  
    return titulos;
}
