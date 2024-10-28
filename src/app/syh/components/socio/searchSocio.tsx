'use client'

import React from "react"
import Link from "next/link"
import { useState } from "react"

interface SocioSearch {
  codigo: string
  nombre: string
}

interface Socios {
  socios: SocioSearch[]
}

export const Buscador = ({ socios }: Socios) => {

  const [search, setSearch] = useState('')
  const [stwich, setStwich] = useState(false)
  const [loading, setLoading] = useState(false)


  //funcion de busqueda
  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // metodo de filtrado
  const results = !search ? socios : socios.filter((dato: SocioSearch) => dato.nombre.toUpperCase().includes(search.toLocaleUpperCase()))
  const resultsCodigo = !search ? socios : socios.filter((dato: SocioSearch) => dato.codigo.toUpperCase().includes(search.toLocaleUpperCase()))

  const handleCLick = () => {
    setStwich(!stwich)
  }

  const handleCLick2 = () => {
    setLoading(!loading)
    console.log(loading)
  }

  return (
    <div className="flex flex-col h-full bg-neutral-200">

      {
        loading ?

          <div className="text-3xl font-bold">cargando...</div>

          :

          <>
            <div className="p-2 bg-white shadow-xl">
              <h1 className="px-1 font-bold">Buscar Socio</h1>
              <nav className=" h-10 flex items-center rounded-sm ">
                <input value={search} onChange={searcher} type="text" placeholder={stwich ? 'Introduce una accion' : 'Introduce un nombre'} className="h-7 ml-1 p-2 rounded-sm text-zinc-500 shadow-sm shadow-slate-300" />
                <button className="bg-white py-1 px-2 mx-2 rounded-sm text-sm hover:bg-slate-600 hover:text-white transition text-zinc-500 shadow-sm shadow-slate-300" onClick={handleCLick}> cambiar filtro </button>

              </nav>
            </div>



            <section className='flex h-full flex-wrap justify-between overflow-y-auto gap-3 p-3'>
              {!stwich ?
                results.map((socio: SocioSearch) => (
                  <Link href={`/syh/socios/${socio.codigo}`} key={socio.codigo} onClick={handleCLick2}>
                    <div className='flex flex-col w-72 h-24 justify-center rounded-md shadow-sm p-3 bg-white' >

                      <div className=' text-sm rounded-md shadow-sm font-bold'>{socio.nombre}</div>
                      <div className='w-28  px-3 text-sm rounded-md font-thin bg-gradient-to-r from-slate-700 to-slate-600 text-zinc-100 text-center'>{socio.codigo}</div>

                    </div>
                  </Link>
                ))
                :
                resultsCodigo.map((socio: SocioSearch) => (
                  <Link className='flex my-2 ' href={`/syh/socios/${socio.codigo}`} key={socio.codigo} onClick={handleCLick2}>
                    <div className='flex flex-col w-72 h-24 justify-center rounded-md shadow-sm p-3 bg-white' >

                      <div className=' text-sm rounded-md shadow-sm font-bold'>{socio.nombre}</div>
                      <div className='w-28  px-3 text-sm rounded-md font-thin bg-gradient-to-r from-slate-700 to-slate-600 text-zinc-100 text-center'>{socio.codigo}</div>

                    </div>
                  </Link>
                ))

              }

            </section>

          </>
      }

    </div>
  )
}