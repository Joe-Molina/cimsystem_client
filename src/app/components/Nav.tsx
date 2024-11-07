'use client'

import Link from "next/link";
import { IconHeader } from "./Icon";
import { faCakeCandles, faLaptop, faHouse, faBook, faLandmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function NavSide() {

  return (
    <header className="[grid-area:aside] flex-col h-screen flex items-center text-white border-r border-neutral-300 bg-white gap-1">
      <Link href={'/'} className="flex justify-center items-center h-12 w-full bg-blue-600 hover:bg-white hover:text-blue-500 border-b transition">
        <FontAwesomeIcon icon={faHouse} className="p-3" />
      </Link>
      <IconHeader href="/cumples" icon={faCakeCandles} text="Cumpleaños socios" />
      <IconHeader href="/informacion/socios" icon={faBook} text="Ficha Socios" />
      <IconHeader href="/cobranza" icon={faLandmark} text="cobranza" />
      <IconHeader href="/mediacim" icon={faLaptop} text="MediaCim" />
    </header>
  )
}