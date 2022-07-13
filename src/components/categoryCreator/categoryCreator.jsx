import React from 'react'
import { Container , Stack , Form , Col , Button } from 'react-bootstrap'
import axios from 'axios'

function CategoryCreator() {

  const [pushCat, setpushCat] = React.useState('')

  let addCategory = (name) => {
    let data = {categoria: name}
    try {
      axios.post(`/prods/category`, data)
      .then((res) => {
        if(res){setpushCat('Categoria agregada con exito')}
        else{setpushCat('Categoria repetida, no se ha agregado')}
      })
    } catch (error) {
      console.error(`ha ocurrido un error en function register: ${error}`)
    }
  }

  return (
    <Container className='general' fluid>
    <Container className='mt-3' fluid>
      <Stack direction="horizontal" gap={2}>
          <div><h3>Agregar Categoria</h3></div>
      </Stack>
    </Container>        
            <hr/>
  <div className='prodForm'>
    <Form noValidate >
          <Col className="mb-3">
            <Form.Group as={Col} md={true} >
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="name" placeholder="Nombre de la categoria" id='categoria' required/>
              <Form.Control.Feedback type="invalid">
                Ingrese un nombre válido
              </Form.Control.Feedback>
            </Form.Group>
            <p>{pushCat}</p>

          <Button variant="success" type="button" onClick={() => {addCategory(document.getElementById('categoria').value)}} className='mt-4'>
            Agregar Categoria
          </Button>
          </Col>
    </Form>
    </div>

  </Container>
  )
}

export default CategoryCreator