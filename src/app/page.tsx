'use client'

import Image from "next/image";
import Link from "next/link";
import { faCakeCandles, faLaptop, faBook, IconLookup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface linkCard {
  nombre: string
  url: string
  description: string
  icon: IconLookup
}

function LinkCard({ url, nombre, icon, description }: linkCard) {

  return (
    <Link href={url} className='flex flex-col justify-center w-96 h-60 rounded-xl border border-neutral-200 p-5 hover:scale-105 transition' >
      <FontAwesomeIcon icon={icon} className=" h-12 w-12" />
      <p className="font-semibold w-full flex py-1 items-center text-2xl">{nombre}</p>
      <p className="text-sm text-zinc-400 font-thin">{description}</p>
      <p className="text-sm text-blue-500">ingresar...</p>
    </Link>
  )
}

export default function Home() {

  const lorem = 'permite a los afiliados de un club ver en un solo perfil la información y beneficios de su familia, gestionar reservas y acceder a actividades exclusivas del club.'

  return (
    <main>
      <header className=" flex justify-between px-10 items-center h-12 w-full shadow-sm bg-slate-50">
        <div className="flex">
          <Image src={"/fotos/logocim.png"} alt={"logo"} width={30} height={30} className="ml-3" />
          <p className="text-xl ml-3 text-neutral-500">Cimsystem</p>
        </div>
        <Link href={"/auth"} className="py-1 px-3 bg-blue-500 text-white rounded-md hover:text-blue-500 hover:bg-white hover:shadow-sm">Iniciar Sesion</Link>
      </header>
      <section className="flex flex-col justify-center items-center max-w-[1300px] mx-auto bg-[url('/fotos/fondo.png')] bg-cover h-[300px] shadow-xl">
        {/* <Image src={"/fotos/fondo.png"} width={1000} height={2000} alt={""} className="w-full relative" /> */}
        <h2 className="text-5xl text-white">Herramientras disponibles en CIMSystem</h2>
        <p className="text-md font-thin text-white opacity-70">herramientas para visualizar datos sobre socios, controlar la publicidad del club, gestionar el historial de pagos. </p>
      </section>


      <article className="h-full flex flex-wrap mt-14 gap-5 max-w-[1200px] mx-auto justify-between">
        <LinkCard url='/mediacim' icon={faLaptop} nombre="Mediacim" description={lorem} />
        <LinkCard url='/informacion/socios/' icon={faBook} nombre="informacion sobre socios" description={lorem} />
        <LinkCard url='/cumples' icon={faCakeCandles} nombre="cumpleanos socios" description={lorem} />
        {/* <LinkCard url='/cobranza' icon={faLandmark} nombre="cobranza" description={lorem} /> */}
      </article>
    </main>

  );
}
