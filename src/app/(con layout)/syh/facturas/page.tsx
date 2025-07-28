import React from 'react'
import { VerFacturasButton } from '../components/header/VerFacturasButton'

async function facturasPage() {

  return (
    <div className='m-4 mt-20'>
      <h1 className="text-3xl font-bold m-3">Buscar Facturas</h1>
      <div><VerFacturasButton /></div>
    </div>
  )
}

export default facturasPage