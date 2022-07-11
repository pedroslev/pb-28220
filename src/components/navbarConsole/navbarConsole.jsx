import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function navbarConsole() {

  let logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "/auth/logout"})
      .then((res)=> {
        if(res){window.location.reload()}
        else{console.error(`ha ocurrido un error al deslogear`)}
      })
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="">Consola</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
        <Nav.Link onClick={() => {logout()}}>Logout</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default navbarConsole