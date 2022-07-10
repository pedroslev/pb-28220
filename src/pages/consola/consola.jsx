import React from 'react'
import axios from 'axios'

//components
import NavbarConsole from '../../components/navbarConsole/navbarConsole.jsx'
import ProductCreator from '../../components/productCreator/productCreator.jsx';
import CategoryCreator from '../../components/categoryCreator/categoryCreator.jsx'

axios.defaults.baseURL = 'http://localhost:8080/api/';

function consola() {
axios.get('/api/auth')
.then((response) => {console.log(response)})

  
  return (
    <div>
        <NavbarConsole />
        <ProductCreator />
        <CategoryCreator />
    </div>
  )
}

export default consola