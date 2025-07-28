/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { BuscadorPropsSyh, SocioSyh } from "@/types";
import { FichaCard } from "@/app/(con layout)/syh/socios/components/ficha";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NavBarFichaSocio } from "./navbar";

export const HomeSocios: React.FC<BuscadorPropsSyh> = ({ socios }) => {

  const [sociosBusqueda, setSociosBusqueda] = useState(socios)
  const [busqueda, setBusqueda] = useState<string>('')
  const [BusquedaType, setBusquedaType] = useState('accion')
  const [load, setLoad] = useState(true)

  useEffect(() => {

    setLoad(true)
    console.log(load)

    switch (BusquedaType) {
      case 'accion':
        console.log(BusquedaType);
        const sociosAccion = socios.filter(({ codigo }) =>
          codigo.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase())
        );
        console.log(sociosAccion);
        setSociosBusqueda(sociosAccion);
        break;

      case 'Nombre':
        console.log(BusquedaType);
        const sociosNombre = socios.filter(({ nombre }) =>
          nombre.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase())
        );
        setSociosBusqueda(sociosNombre);
        break;

      case 'cedula':
        console.log(BusquedaType);
        const sociosCedula = socios.filter(({ cedula }) =>

          cedula != null && cedula.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase())

        );
        setSociosBusqueda(sociosCedula);
        break;
      default:
    }

    setTimeout(() => {
      setLoad(false)
    }, 1000);

    console.log(load)

    console.log(sociosBusqueda)

  }, [BusquedaType, busqueda])


  return (
    <div className='flex w-full flex-col mx-auto h-[87vh] overflow-y-auto'>
      <NavBarFichaSocio setBusqueda={setBusqueda} busquedaType={BusquedaType} setBusquedaType={setBusquedaType} />
      <div className="flex flex-wrap gap-7 justify-center items-start max-w-[1400px] mx-auto h-full">


        {

          load ?

            <Image src={"/loader3.webp"} alt={"loader"} width={400} height={400} className="self-center h-52 w-52" />

            :

            sociosBusqueda.map((socio: SocioSyh) => (
              <FichaCard nombre={socio.nombre} codigo={socio.codigo} cedula={socio.cedula} key={socio.codigo} tipo={socio.codigo} />
            ))


        }
      </div>

    </div>
  )
}