import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function prodCard(props) {
  console.log(props.prod)
  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="data:image/jpeg;base64,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" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.price}
                </Card.Text>
                <Button variant="primary">Agregar</Button>
        </Card.Body>
    </Card>
  )
}

export default prodCard