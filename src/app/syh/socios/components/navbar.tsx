/* eslint-disable react-hooks/exhaustive-deps */
'use client'


import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

interface TypeButtonProps {
  busquedaType: string;
  setBusquedaType: (type: string) => void;
  label: string;
}

const SetTypeButton: React.FC<TypeButtonProps> = ({ busquedaType, setBusquedaType, label }) => {

  return (
    <button className={`hover:bg-slate-100 hover:text-blue-500 py-1 px-3 rounded-md font-medium text-sm  ${busquedaType == label && 'bg-slate-100 text-blue-500'}`} onClick={() => setBusquedaType(label)}>
      {label}
    </button>
  )
}

interface BusquedaInterface {
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  busquedaType: string
  setBusquedaType: (type: string) => void;
}

export const NavBarFichaSocio: React.FC<BusquedaInterface> = ({ setBusqueda, busquedaType, setBusquedaType }) => {


  const [terminarBusqueda, setTerminarBusqueda] = useState<string>('');



  const manejarBusqueda = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerminarBusqueda(event.target.value)
  }

  useEffect(() => {
    // Configuramos el temporizador
    const timer = setTimeout(() => {
      setBusqueda(terminarBusqueda); // Aquí puedes ejecutar la lógica que desees
      console.log('Buscando:', terminarBusqueda); // Ejemplo de lógica que se ejecuta después de 500 ms
    }, 300);

    // Limpieza del temporizador
    return () => {
      clearTimeout(timer);
    };
  }, [terminarBusqueda]); // El efecto depende de 'busqueda'



  return (
    <div className='flex flex-col py-3 justify-between w-full max-w-[1400px] m-auto sticky top-0 bg-white z-50 ' >

      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">

          <Input type="text" placeholder="Buscar..." className="w-80" onChange={manejarBusqueda} />
          <section className="flex border h-9 rounded-sm items-center gap-2 p-2 shadow-sm">
            <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"accion"} />
            <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"cedula"} />
            <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"Nombre"} />
            <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"Familiar"} />
          </section>
        </div>
        <Link className="border  h-9 rounded-sm px-2 text-zinc-400 shadow-sm hover:bg-zinc-50 flex justify-center items-center" href='/informacion/socios'>Datos Neo</Link>
      </div>
      <div className="h-12 w-full bg-yellow-400 flex justify-center items-center font-mono text-black my-2 border border-yellow-400 rounded-sm gap-4"> <Image src={"/iconos/warningmasnegro.svg"} alt={"warning"} className="h-10" width={50} height={50} />
        ATENCION - Estos datos pertenecen al sistema antiguo syh, si necesita datos actualizados presione el boton<Link href={'/informacion/socios'} className="">(datos Neo)</Link>
        {/* ESTOS DATOS PERTECEN AL SISTEMA ANTIGUO SYH, SI NECESITA DATOS ACTUALIZADOS PRESIONE EL BOTON (DATOS ACTUALIZADOS) */}
      </div>
    </div >
  )
}