import React from 'react'
import { Buscador } from '../components/socio/searchSocio';

const SociosPage = async () => {

  const data = await fetch("http://10.10.1.4:3010/socios")

  const socios = await data.json()

  console.log(socios)

  return (
    <Buscador socios={socios} />
  )
}

export default SociosPage
