import React from 'react'
import { Container , Stack , Form , Col , Button } from 'react-bootstrap'

function categoryCreator() {
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
            <Form.Group as={Col} md={true} controlId="formGridName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="name" placeholder="Nombre de la categoria" required autocomplete="off"/>
              <Form.Control.Feedback type="invalid">
                Ingrese un nombre válido
              </Form.Control.Feedback>
            </Form.Group>

          <Button variant="success" type="submit" className='mt-4'>
            Agregar Categoria
          </Button>
          </Col>
    </Form>
    </div>

  </Container>
  )
}

export default categoryCreator