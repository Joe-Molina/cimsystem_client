import React from 'react'
import { Buscador } from '../components/socio/searchSocio';

const SociosPage = async () => {

  const data = await fetch("http://localhost:3002/socios")

  const socios = await data.json()

  console.log(socios)

  return (
    <Buscador socios={socios} />
  )
}

export default SociosPage
