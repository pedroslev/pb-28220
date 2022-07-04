import React from 'react'

//components
import NavbarConsole from '../../components/navbarConsole/navbarConsole.jsx'
import ProductCreator from '../../components/productCreator/productCreator.jsx';
import CategoryCreator from '../../components/categoryCreator/categoryCreator.jsx'

function consola() {
  return (
    <div>
        <NavbarConsole />
        <ProductCreator />
        <CategoryCreator />
    </div>
  )
}

export default consola