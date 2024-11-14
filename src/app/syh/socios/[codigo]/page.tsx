import { SocioSyh } from '@/types'
import axios from 'axios'
import React from 'react'
import { BuscarSocios } from './components/buscarSocioDesdeFichaShy'

async function socioPage({ params: { codigo } }: { params: { codigo: string } }) {


  const data = await fetch(`http://10.10.1.4:3010/socio/${codigo}`)

  const socios: SocioSyh[] = (await axios.get('http://10.10.1.4:3010/socios')).data

  const filterSocios = socios.filter(socio => socio.codigo !== "00000" && socio.codigo !== "0000" ? true : false)

  const socio = await data.json()

  console.log(socio)
  return (
    <article className="[grid-area:main]">
      <div className="w-full bg-white border-b border-zinc h-12 font-bold flex justify-center items-center text-blue-500">Ficha Socios SyH</div>
      <BuscarSocios socios={filterSocios} socio={socio} />
    </article>
  )
}

export default socioPage