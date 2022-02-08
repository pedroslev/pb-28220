const socket = io.connect();

//productos
const title = document.getElementById('title').value
const price = document.getElementById('price').value
const thumbnail = document.getElementById('thumbnail').value


document.getElementById('Agregar').addEventListener('click', () => {
    socket.emit('productos',  {title: title, price: price, thumbnail: thumbnail});
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
const email = document.getElementById('email')
document.getElementById('enviar').addEventListener('click', () => {
    socket.emit('mensaje',  {mensaje: input.value, email: email.value});
})
socket.on('mensajes', msjs => {
    const mensajesHTML = msjs
        .map(msj => `${msj.email.email} -> ${msj.mensaje.mensaje}`)
        .join('<br>')
    document.getElementById('mensajeria').innerHTML = mensajesHTML
});
