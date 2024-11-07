'use client'

import { infoSocios } from "@/types"
import { AlertDialogDemo } from "./fotoAlert";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ data, nombre }: any) {

  return (
    <div className="flex flex-col mx-1">
      <p className="text-sm font-semibold inline-block">{nombre}</p>
      <p className="text-sm font-medium inline-block text-zinc-500">{data}</p>
    </div>
  )
}

export const FichaSocio: React.FC<infoSocios> = ({ socio, familiares, pases }) => {

  // const { socio, familiares, pases } = data;
  const url: string = `http://10.10.1.2:8080/images_socios/${socio.cedula}.jpg`

  console.log(socio, familiares, pases);
  return (
    <section className="flex  w-full h-80 gap-5  py-10">

      <AlertDialogDemo url={url} accion={socio.accion} />

      <div className="flex flex-col w-full  overflow-y-auto text-neutral-700">
        <p className="py-3 px-1 font-semibold text-2xl text-neutral-800">{socio.nombre}</p>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-wrap  gap-3 ">
            <Info data={socio.accion} nombre={"Accion"} />
            <Info data={socio.cedula} nombre={"cedula"} />
            <Info data={socio.rif_tra} nombre={"Rif Trabajo"} />
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
            <Info data={socio.celular} nombre={"celular"} />
            <Info data={socio.telefonos} nombre={"telefono"} />
            <Info data={socio.e_mail} nombre={"Email"} />
            <Info data={socio.empresa_tra} nombre={"Profesion"} />
            <Info data={socio.telefonos_tra} nombre={"Telefono"} />
            <Info data={socio.nombre_rep} nombre={"Nombre Rep"} />
            <Info data={socio.telefonos_rep} nombre={"Telefono_rep"} />
          </div>
        </div>
      </div>

    </section>
  )
}