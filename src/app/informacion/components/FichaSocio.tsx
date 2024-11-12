'use client'

import { infoSocios } from "@/types"
import { AlertDialogDemo } from "./fotoAlert";
import { useState } from "react";
import { InfoFamilia } from "./InfoFamilia";
import { InfoPases } from "./InfoPases";
import { InfoContactos } from "./infoContactos";
import { Facturas } from "./Facturas";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ data, nombre }: any) {

  return (
    <div className="flex flex-col mx-1">
      <p className="text-sm font-medium inline-block">{nombre}</p>
      <p className="text-sm  font-light inline-block text-zinc-500">{data}</p>
    </div>
  )
}

export const FichaSocio: React.FC<infoSocios> = ({ socio, familiares, pases }) => {

  // const { socio, familiares, pases } = data;
  const url: string = `http://10.10.1.2:8080/images_socios/${socio.cedula}.jpg`

  const options = ["Contactos", "Familia", "Pases", "Facturacion", "Invitados"]

  const [option, setOption] = useState('Contactos')


  console.log(socio, familiares, pases);
  console.log(option)
  return (
    <section className="flex flex-col items-center w-full h-full gap-5">
      <div className="flex gap-5 ">
        <AlertDialogDemo url={url} accion={socio.accion} />
        <div className="flex flex-col  overflow-y-auto text-neutral-700">
          <div className="py-3 px-1 font-semibold text-2xl text-neutral-800 inline-block">{socio.nombre}</div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-wrap  gap-x-3 ">
              <Info data={socio.accion} nombre={"Accion"} />
              <Info data={socio.cedula} nombre={"cedula"} />
              <Info data={socio.rif_tra} nombre={"RIF"} />
              <Info data={socio.fecha_nac.slice(0, 10)} nombre={"Fecha Nacimiento"} />
              <Info data={socio.sexo == 1 ? "Masculino" : "Femenino"} nombre={"sexo"} />
              <Info data={socio.estado_civ == 1 ? "Soltero" : "Casado"} nombre={"Estado Civil"} />
              <Info data={socio.profesion} nombre={"Profesion"} />
              <Info data={socio.nacionalidad} nombre={"Nacionalidad"} />
              <Info data={socio.direccion} nombre={"Direccion"} />
            </div>
            <div className="flex  gap-3 ">
              <Info data={socio.tipo_socio == 1 ? "Titular" : "Disfrutante"} nombre={"Tipo Socio"} />
              <Info data={socio.fecha_ing.slice(0, 10)} nombre={"Ingreso"} />
              <Info data={socio.nfcId} nombre={"Carnet"} />
              <Info data={socio.nota} nombre={"nota"} />
              <Info data={socio.empresa_tra} nombre={"Profesion"} />
              <Info data={socio.nombre_rep} nombre={"Nombre Rep"} />
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
      {option == "Pases" && pases.length > 1 && <InfoPases pases={pases} />}
      {option == "Contactos" && <InfoContactos socio={socio} />}
      {option == "Facturacion" && <Facturas accion={socio.accion} />}

    </section>
  )
}