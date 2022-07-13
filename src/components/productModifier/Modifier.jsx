import React from 'react'
import { Container , Stack , Button, Table, Modal, Form, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useEffect } from 'react';
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Modifier() {

    const[prods, setProds] = React.useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [edit, setEdit] = React.useState({})

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/prods"})
      .then((result) => {
        setProds(result.data)
      })

  }, []);

  return (
    <Container className='general' fluid>
    <Container className='mt-3' fluid>
      <Stack direction="horizontal" gap={2}>
          <div><h3>Agregar Categoria</h3></div>
      </Stack>
    </Container>        
            <hr/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Imagen</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {
        Object.values(prods).map((item) => {
            return <tr>
            <td>{item.producto}</td>
            <td>{item.categoria}</td>
            <td>${item.price}</td>
            <td><img alt="mod" style={{width: '5em'}} src={item.imagen} /></td>
            <td><Button variant="secondary" onClick={() => {
                setModalShow(true)
                setEdit(item)
                }}><img alt="mod" style={{width: '1em'}} src="https://img.icons8.com/ios-glyphs/344/edit--v1.png" /></Button></td>
            <EditModal
            show={modalShow}
            items={edit}
            onHide={() => setModalShow(false)}
            />
          </tr>
        })
        }
        
      </tbody>
    </Table>
    </Container>
  )
}


function EditModal(props) {

    const[categories, setCategories] = React.useState([])

    const [newProd, setNewprod ]= React.useState('')
    const [newCategory, setNewcategory ]= React.useState('')
    const [newImg, setNewimg ]= React.useState('')
    const [newPrice, setNewprice ]= React.useState('')


    useEffect(() => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "/prods/category"})
        .then((res) => {
          setCategories(res.data)
        })


    }, []);

    let modifyProd = (id, prod, cat, img, price) => {
        
    setNewprod(document.getElementById('newprod').value)
    setNewcategory(document.getElementById('newcategoria').value)
    setNewimg(document.getElementById('newimg').value)
    setNewprice(document.getElementById('newprice').value)

        let data = {
            _id: id,
            producto: prod,
            categoria: cat,
            imagen: img,
            price: price
        }
        console.log(data)
        /*
        axios({
            method: "PUT",
            withCredentials: true,
            url: "/prods/modify",
            data: data})
            .then((resp) => {
              console.log(resp)
            })*/
    }

    let deleteProd = (id) => {
        axios({
            method: "DELETE",
            withCredentials: true,
            url: `/prods/delete/${id}`})
            .then((resp) => {
              console.log(resp)
            })
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate >
            <Col className="mb-3">
              <Form.Group as={Col} md={true} >
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="name" placeholder="Nombre de producto" onChange={(e) => {setNewprod(e.target.value)}} defaultValue={props.items.producto} id='newprod' required/>
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre válido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm className="mb-3 mb-sm-0">
              <Form.Label>Categoria</Form.Label>
                  <Form.Select id='newcategoria' onChange={(e) => {setNewcategory(e.target.selected)}} required>
                    <option key={props.items._id} >{props.items.categoria}</option>
                    {
                      categories.map((cat) => {
                        if(cat !== props.items.categoria){
                            return <option key={cat}>{cat}</option>
                        }
                        return ''
                      })
                    }
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                  Ingrese una categoria de la lista
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={true} >
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="name" placeholder="URL IMG" onChange={(e) => {setNewimg(e.target.value)}} defaultValue={props.items.imagen} id='newimg' required />
                <Form.Control.Feedback type="invalid">
                  Ingrese un nombre válido
                </Form.Control.Feedback>
              </Form.Group>
            
              <Form.Group as={Col} sm='6' className="mb-5 mb-sm-0" >
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <FormControl min='1' type="number" onChange={(e) => {setNewprice(e.target.value)}} defaultValue={props.items.price} id='newprice'required />
                  <Form.Control.Feedback type="invalid">
                  Ingrese un precio válido
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

            </Col>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="button" onClick={()=> {deleteProd(props.items._id)}}>Eliminar</Button>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="success" type="button" onClick={() => {modifyProd(props.items._id, newProd, newCategory, newImg, newPrice)}}>Actualizar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Modifier