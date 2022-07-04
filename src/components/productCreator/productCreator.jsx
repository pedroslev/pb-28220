import React from 'react'
import { Container , Stack , Form , Col , Button , InputGroup ,FormControl } from 'react-bootstrap'
import './productCreator.css'


function productCreator() {
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
              <Form.Group as={Col} md={true} controlId="formGridName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="name" placeholder="Nombre de producto" required autocomplete="off"/>
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre válido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm className="mb-3 mb-sm-0" controlId="formGridDescription">
              <Form.Label>Categoria</Form.Label>
                  <Form.Select required>
                    <option value="">Elegir Categoria...</option>
                    <option value="1">...</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                  Ingrese una categoria de la lista
                </Form.Control.Feedback>
              </Form.Group>
            
              <Form.Group as={Col} sm='6' className="mb-5 mb-sm-0" controlId="formGridPrice">
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <FormControl min='1' type="number" id="inlineFormInputGroup" required autocomplete="off" placeholder="000" />
                  <Form.Control.Feedback type="invalid">
                  Ingrese un precio válido
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

            <Button variant="success" type="submit" className='mt-4'>
              Agregar Producto
            </Button>
            </Col>
      </Form>
      </div>
 
    </Container>
  )
}

export default productCreator