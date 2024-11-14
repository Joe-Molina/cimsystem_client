'use client'

import { InfoSocioSyhProps, } from "@/types"
import { useState } from "react";
// import { Facturas } from "./Facturas";
import { AlertDialogDemo } from "@/app/informacion/components/fotoAlert";
import { InfoFamilia } from "./infoFamilia";
import { Facturas } from "./facturas";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ data, nombre }: any) {

  return (
    <div className="flex flex-col mx-1">
      <p className="text-sm font-medium inline-block">{nombre}</p>
      <p className="text-sm  font-light inline-block text-zinc-500">{data}</p>
    </div>
  )
}

export const FichaSocio: React.FC<InfoSocioSyhProps> = ({ socio, familiares }) => {

  // const { socio, familiares, pases } = data;
  const url: string = `http://10.10.1.2:8080/images_socios/${socio.cedula}.jpg`

  const options = ["Familia", "Facturacion"]

  const [option, setOption] = useState('Familia')

  console.log(socio)

  return (
    <section className="flex flex-col items-center w-full h-full gap-5">
      <div className="flex gap-5 ">
        <AlertDialogDemo url={url} accion={socio.codigo} />
        <div className="flex flex-col  overflow-y-auto text-neutral-700">
          <div className="py-3 px-1 font-semibold text-2xl text-neutral-800 inline-block">{socio.nombre}</div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-wrap  gap-x-3 ">
              <Info data={socio.codigo} nombre={"Accion"} />
              <Info data={socio.cedula} nombre={"cedula"} />
              <Info data={socio.nrorif} nombre={"RIF"} />
              <Info data={socio.fechanac} nombre={"Fecha Nacimiento"} />
              <Info data={socio.sexo == "1" ? "Masculino" : "Femenino"} nombre={"sexo"} />
              <Info data={socio.edocivil == "1" ? "Soltero" : "Casado"} nombre={"Estado Civil"} />
              <Info data={socio.direccion} nombre={"Direccion"} />
            </div>
            <div className="flex  gap-3 ">
              <Info data={socio.tipo} nombre={"Tipo Socio"} />
              <Info data={socio.fecha} nombre={"Ingreso"} />
              <Info data={socio.carnet} nombre={"Carnet"} />
              <Info data={socio.nota} nombre={"nota"} />
              <Info data={socio.trabtelefon} nombre={"telefono del trabajo"} />
              <Info data={socio.telefono_movil} nombre={"telefono movil"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        {
          options.map((el, index) => (
            <button key={index} className={`py-1 px-3 rounded-md  hover:bg-blue-500 hover:text-white ${option == el ? " bg-blue-500 text-zinc-50" : "text-zinc-500"}`} onClick={() => setOption(el)}>{el}</button>
          ))
        }
      </div>

      {option == "Familia" && familiares.length > 1 && <InfoFamilia familiares={familiares} />}
      {option == "Facturacion" && <Facturas codigo={socio.codigo} />}

    </section>
  )
}