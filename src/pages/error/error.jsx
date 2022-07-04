import React from 'react'
import './error.css'

function error() {
  return (
    <section className="notfound">
      <div>
        <h1>Lo sentimos, la pagina que estas buscando no existe.</h1>
      </div>

      <div>
        <p>Error: 404 Not Found</p>           
      </div>

      <div>
        <p><a href="/">Regresar</a></p>
      </div>

    </section>
  )
}

export default error