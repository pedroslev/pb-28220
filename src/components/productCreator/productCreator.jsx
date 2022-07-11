import React from 'react'
import { Container , Stack , Form , Col , Button , InputGroup ,FormControl } from 'react-bootstrap'
import './productCreator.css'
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function ProductCreator() {
  
  const[categories, setCategories] = React.useState([])
  const[prod, setProd] = React.useState('')
  const[img, setImg] = React.useState('')
  const[price, setPrice] = React.useState('')
  

  let getCategories = () =>{
    axios({
      method: "GET",
      withCredentials: true,
      url: "/prods/category"})
      .then((res) => {
        setCategories(res.data)
      })
  }

  let addProd = (prod, cat, img, price) => {
    let data = {
      producto: prod,
       categoria: cat,
        imagen: img,
         price: price
    }
    axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: "/prods"})
      .then((res) => {
        setCategories(res.data)
      })
  }
  

  return (
    <Container className='general' fluid>
      <Container className='mt-3' fluid>
        <Stack direction="horizontal" gap={2}>
            <div><h3>Agregar Producto</h3></div>
        </Stack>
      </Container>        
              <hr/>
    <div className='prodForm'>
      <Form noValidate >
            <Col className="mb-3">
              <Form.Group as={Col} md={true} >
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="name" placeholder="Nombre de producto" onChange={(e) => setProd(e.target.value)} id='prod' required autocomplete="off"/>
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre válido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm className="mb-3 mb-sm-0">
              <Form.Label>Categoria</Form.Label>
                  <Form.Select id='categoria' required onClick={() => getCategories()}>
                    {
                      categories.map((cat) => {
                        return <option>{cat}</option>
                      })
                    }
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                  Ingrese una categoria de la lista
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={true} >
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="name" placeholder="URL IMG" id='img' onChange={(e) => setImg(e.target.value)} required autocomplete="off"/>
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre válido
                </Form.Control.Feedback>
              </Form.Group>
            
              <Form.Group as={Col} sm='6' className="mb-5 mb-sm-0" >
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <FormControl min='1' type="number" id='price' onChange={(e) => setPrice(e.target.value)} required autocomplete="off" placeholder="000" />
                  <Form.Control.Feedback type="invalid">
                  Ingrese un precio válido
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

            <Button variant="success" type="button" onClick={ () => {addProd(prod, document.getElementById('categoria').value, img, price)}} className='mt-4'>
              Agregar Producto
            </Button>
            </Col>
      </Form>
      </div>
 
    </Container>
  )
}

export default ProductCreator