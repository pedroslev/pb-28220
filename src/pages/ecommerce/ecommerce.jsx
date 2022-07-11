import React from 'react'
import './ecommerce.css'
//components
import NavbarEcom from '../../components/navbarEcom/NavbarEcom.jsx';
import ProdCard from '../../components/prodCard/prodCard.jsx';
import { useEffect } from 'react';
import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:8080/api/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



function Ecommerce() {
  
  axios({
    method: "GET",
    withCredentials: true,
    url: "/auth",
  })
.then((response) => {
if(response.data.email === undefined){window.location.href= '/login'}
})

  const[prods, setProds] = React.useState([])

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
    <div>
        <NavbarEcom />
        <div class="prodmain">
        {
        Object.values(prods).map((item) => {
          return <div className='products'>
          <ProdCard title={item.producto} price={item.price} imagen={item.imagen} categoria={item.categoria} idprod={item._id}/>
          </div>
          })
        }
        </div>
        
    </div>
  )
}

export default Ecommerce