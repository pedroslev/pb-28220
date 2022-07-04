import React from 'react'
import './ecommerce.css'

//components
import NavbarEcom from '../../components/navbarEcom/navbarEcom.jsx';
import ProdCard from '../../components/prodCard/prodCard.jsx';

function ecommerce() {
  let prod = {
    title: "carne",
    price: "150"
}
  return (
    <div>
        <NavbarEcom />
        <div className='products'>
        <ProdCard title={prod.title} price={prod.price} />
        </div>
    </div>
  )
}

export default ecommerce