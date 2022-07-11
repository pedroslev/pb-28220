import React from 'react'
import axios from 'axios'

//components
import NavbarConsole from '../../components/navbarConsole/navbarConsole.jsx'
import ProductCreator from '../../components/productCreator/productCreator.jsx';
import CategoryCreator from '../../components/categoryCreator/categoryCreator.jsx'

axios.defaults.baseURL = 'http://localhost:8080/api/';

function consola() {
  axios({
    method: "GET",
    withCredentials: true,
    url: "/auth",
  })
.then((response) => {
if(response.data.email === undefined){window.location.href= '/login'}
})

  
  return (
    <div>
        <NavbarConsole />
        <ProductCreator />
        <CategoryCreator />
    </div>
  )
}

export default consola