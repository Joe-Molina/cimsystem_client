/* eslint-disable react-hooks/exhaustive-deps */
'use client'


import { Input } from "@/components/ui/input"
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
    <div className=' flex py-3 justify-between w-full max-w-[1400px] m-auto sticky top-0 bg-white z-40 ' >
      <div className="flex gap-2 ">
        <Input type="text" placeholder="Buscar..." className="w-80" onChange={manejarBusqueda} />
        <section className="flex border h-9 rounded-sm items-center gap-2 p-2 shadow-sm">
          <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"accion"} />
          <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"cedula"} />
          <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"Nombre"} />
          <SetTypeButton busquedaType={busquedaType} setBusquedaType={setBusquedaType} label={"Familiar"} />
        </section>
      </div>
      <Link className="border  h-9 rounded-sm px-2 text-zinc-400 shadow-sm hover:bg-zinc-50 flex justify-center items-center" href='/syh/socios'>Sistema antiguo</Link>
    </div >
  )
}