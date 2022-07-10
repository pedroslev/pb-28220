import React from 'react'
import './login.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import md5 from 'md5'

function register(user, pwd) {

  axios.defaults.baseURL = 'http://localhost:8080/api/';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  let register = (user, pwd) => {
    let data = {
      email: user,
      password: md5(pwd)
    }

    try {
      axios.post(`/auth/register`, data)
    } catch (error) {
      console.error(`ha ocurrido un error en function register: ${error}`)
    }
    
  }

  return (
    <div className='main'>
    <h1 className='title'>Register</h1>
    <Form>
      <p id='incase'></p>
    <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" id="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
        We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" id="pwd" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="button" onClick={ () => register(document.getElementById('email').value, document.getElementById('pwd').value)}>
        Register
    </Button>
    </Form>
    <Link to='/login'> Already have an account? Login</Link>
    </div>
  )
}

export default register