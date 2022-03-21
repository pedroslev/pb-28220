const socket = io.connect();

//productos
const title = document.getElementById('title')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')


document.getElementById('Agregar').addEventListener('click', () => {
    socket.emit('productos',  {title: title.value, price: price.value, thumbnail: thumbnail.value});
})
socket.on('productos', prods => {
    const prodsHTML = prods
        .map(prods => `<div class="card producto" style="width: 18rem;">
        <img src="${prods.thumbnail.thumbnail}" class="card-img-top" alt="thumbnail">
        <div class="card-body">
          <h5 class="card-title">${prods.title.title}</h5>
          <p class="card-text">$ ${prods.price.price}</p>
        </div>`)
        .join('<br>')
    document.getElementById('productos').innerHTML = prodsHTML
});




// mensajeria
const input = document.getElementById('mensaje')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const edad = document.getElementById('edad')
const alias = document.getElementById('alias')
const avatar = document.getElementById('avatar')
document.getElementById('enviar').addEventListener('click', () => {
    socket.emit('mensaje',  {
        author:{
            id: 1,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            alias: alias.value,
            avatar: avatar.value,       
        },
        text: input.value,
    });
})
socket.on('mensajes', msjs => {
    let timestamp = Date().toString()
    const mensajesHTML = msjs
        .map(msj => `<div class="mensajeriadiv"><p class="email">${msj.nombre.nombre}  </p><p class="timestamp"> [${timestamp}]  -> </p><p class="message">  ${msj.mensaje.mensaje}</p></div>`)
        .join('<br>')
    document.getElementById('mensajeria').innerHTML = mensajesHTML
});
