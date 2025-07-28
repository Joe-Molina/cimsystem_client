/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { BuscadorProps, Socio } from "@/types";
import { NavBarFichaSocio } from "./navBar";
import { FichaCard } from "./fichaSocioCard";
import { useEffect, useState } from "react";
import Image from "next/image";

export const HomeSocios: React.FC<BuscadorProps> = ({ socios }) => {

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
        const sociosAccion = socios.filter(({ accion }) =>
          accion.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase())
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
          cedula.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase())
        );
        setSociosBusqueda(sociosCedula);
        break;

      // Puedes añadir más casos según sea necesario...

      default:
      // Código a ejecutar si no coincide con ningún caso
    }

    setTimeout(() => {
      setLoad(false)
    }, 1000);

    console.log(load)

    console.log(sociosBusqueda)

  }, [BusquedaType, busqueda])


  return (
    <div className='flex w-full flex-col mx-auto overflow-y-auto'>
      <NavBarFichaSocio setBusqueda={setBusqueda} busquedaType={BusquedaType} setBusquedaType={setBusquedaType} />
      <div className="flex flex-wrap gap-7 justify-center items-start max-w-[1400px] mx-auto h-[78vh]">


        {

          load ?

            <Image src={"/loader3.webp"} alt={"loader"} width={400} height={400} className="self-center h-52 w-52" />

            :

            sociosBusqueda.map((socio: Socio) => (
              <FichaCard nombre={socio.nombre} accion={socio.accion} cedula={socio.cedula} tipo_socio={socio.tipo_socio} key={socio.accion} />
            ))


        }
      </div>

    </div >
  )
}