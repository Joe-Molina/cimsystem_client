"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface cardSocio {
  nombre: string
  accion: string
  cedula: string
}

export const BuscarFichaCard: React.FC<cardSocio> = ({ nombre, accion, cedula }) => {

  const src = `http://10.10.1.2:8080/images_socios/${cedula}.jpg`

  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Link className="flex  h-20 w-full p-2 border rounded- transition bg-white hover:bg-slate-100 z-10 items-center" href={`/syh/socios/${accion}`}>
      <Image src={imgSrc} onError={() => { setImgSrc("/perfil.png") }} alt={"socio"} width={50} height={50} className="rounded-full w-10 overflow-hidden h-10 " />
      <div className="flex flex-col w-full ml-2">
        <p className="text-[12px] text-start font-semibold">{nombre}</p>
        <div className="flex justify-between"><p className="text-end text-sm text-zinc-500 self-end">{cedula}</p><p className="text-end text-sm font-bold text-blue-500 self-end">{accion}</p></div>
      </div>
    </Link>
  )
}