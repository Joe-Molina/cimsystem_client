/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { InfoSociosSyhProps, SocioSyh } from "@/types";
import { NavBarFichaSocio } from "@/app/informacion/socios/components/navBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BuscarFichaCard } from "./buscarFicha";
import { FichaSocio } from "./fichaSocio";

export const BuscarSocios: React.FC<InfoSociosSyhProps> = ({ socios, socio }) => {

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
        const sociosCedula = socios.filter(({ cedula }) => { if (cedula) { cedula.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase()) } }
        );
        setSociosBusqueda(sociosCedula);
        break;

      // Puedes añadir más casos según sea necesario...

      default:
      // Código a ejecutar si no coincide con ningún caso
    }

    setTimeout(() => {
      setLoad(false)
    }, 100);

  }, [BusquedaType, busqueda])

  const accion = socio.socio.codigo

  return (
    <div className='flex  relative  w-full flex-col mx-auto h-[93vh] overflow-y-auto'>
      <NavBarFichaSocio setBusqueda={setBusqueda} busquedaType={BusquedaType} setBusquedaType={setBusquedaType} />
      {

        load ?

          busqueda != "" && <div className=" flex flex-col fixed left-44 top-[110px] w-80 overflow-y-auto h-[84vh] " ><Image src={"/loader3.webp"} alt={"loader"} width={400} height={400} className="h-24 w-24" /></div>

          :

          <div className=" flex flex-col fixed left-44 top-[110px] w-80 overflow-y-auto h-[84vh] " >
            {busqueda != "" && sociosBusqueda.map((socio: SocioSyh) => (
              <BuscarFichaCard nombre={socio.nombre} accion={accion} cedula={socio.cedula} key={socio.codigo} />
            ))}
          </div>


      }
      <div className="flexflex-wrap gap-7 justify-center items-start max-w-[1400px] mx-auto h-full w-full ">
        <FichaSocio socio={socio.socio} familiares={socio.familiares} />
      </div>
    </div>
  )
}