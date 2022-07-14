import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Cart from './Cart.jsx'
import Button from 'react-bootstrap/Button'
import './cart.css'
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function NavbarEcom() {

  const [modalShow, setModalShow] = React.useState(false);
  const [cartitems, setCartitems] = React.useState([]);

  let obtainCart = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/cart",
    })
    .then((response) => setCartitems(response.data))
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="">pb-28220</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
    <div className="cart">
      <Button variant="primary" onClick={() => {
        setModalShow(true) 
        obtainCart()
      }}>
        Cart
      </Button>
      </div>
    
      <Cart 
        show={modalShow}
        cartitems={cartitems} 
        onHide={() => setModalShow(false)}
      />
      

    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavbarEcom