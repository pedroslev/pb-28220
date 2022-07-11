import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function ProdCard(props) {
  const [counter, setCounter] = React.useState(0)
  

  let contador = (op) => {
    if(op === 'plus'){
      setCounter(counter+1)
    }else{
      if(counter !== 0){
        setCounter(counter-1)
      }
    }
  }

  let addProd = (id, nombre, precio, cant) => {

    axios({
      method: "GET",
      withCredentials: true,
      url: "/auth",
    })
  .then((response) => {   
   let data = {
    email: response.data.email,
    id: id,
    producto: nombre,
    price: precio,
    cantidad: cant
  }
  console.log(data)
  axios({
    method: "POST",
    withCredentials: true,
    url: "/cart/addtocart",
    data: data
  })
  .then((response)=> {
    console.log(response)
  })
  })
  
    
  }
  return (
    <Card style={{ width: '12rem' }}>
        <Card.Img variant="top" src={props.imagen} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                ${props.price}
                </Card.Text>
                <Card.Text>
                <Button variant="danger" onClick={() => {contador('minus')}} >-</Button>
                {'         '}
                  {counter}
                  {'         '}
                  <Button variant="success" onClick={() => {contador('plus')}}>+</Button>
                  </Card.Text>
                <Button variant="primary" onClick={() => {addProd(props.idprod, props.title, props.price, counter)}}>Agregar</Button>
        </Card.Body>
    </Card>
  )
}

export default ProdCard