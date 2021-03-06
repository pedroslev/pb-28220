import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    
function Cart(props) {

let removeCart = (id, user) => {
console.log(id, user)
axios({
  method: "DELETE",
  withCredentials: true,
  url: `/cart/${user}/${id}`,
})
.then((response) => {
  window.location.reload()
})
}

let makeOrder = () => {

  let data = {
    cart: props.cartitems
  }

  axios({
    method: "POST",
    withCredentials: true,
    url: `/cart/order`,
    data: data
  })
  .then((response) => {
    window.location.href('/success')
  })
  }


  return (
    <Modal
    id='modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Carrito
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            </tr>
        </thead>
        <tbody>
          {
            Object.values(props.cartitems).map((items) => {
              return <tr>
              <td>{items.producto}</td>
              <td>{items.cantidad}</td>
              <td> $ {items.price * items.cantidad}</td>
              <td><Button variant="danger" onClick={()=> removeCart(items.id, items.email)}><img alt="trash" style={{width: '1em'}} src="https://img.icons8.com/ios-glyphs/344/trash.png" /></Button></td>
              </tr>
            })
          }
        </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {makeOrder()}}>Comprar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Cart