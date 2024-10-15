'use client'

import { InfoSociosProps } from "@/types"
import { AlertDialogDemo } from "./fotoAlert";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ data, nombre }: any) {

  return (
    <article className="font-bold border border-zinc-300 rounded-lg mx-2">
      <div className="p-1 mx-2">{nombre} <p className="font-medium">{data}</p> </div>
    </article>
  )
}

export const InfoSocio: React.FC<InfoSociosProps> = ({ data }) => {

  const { socio, familiares, pases } = data;
  const url: string = `http://10.10.1.2:8080/images_socios/${socio.cedula}.jpg`

  console.log(socio, familiares, pases);
  return (
    <section className="flex flex-col items-center w-1/2 h-full  gap-2  p-10">
      <AlertDialogDemo url={url} />

      <p className="text-3xl font-bold">{socio.nombre}</p>

      <div className="flex w-full h-full overflow-y-auto text-zinc-800">
        <div className="flex flex-col gap-2 w-1/2  h-full ">
          <Info data={socio.tipo_socio == 1 ? "Titular" : "Disfrutante"} nombre={"Tipo Socio"} />
          <Info data={socio.accion} nombre={"nro acion"} />
          <Info data={socio.fecha_ing.slice(0, 10)} nombre={"Ingreso"} />
          <Info data={socio.nacionalidad} nombre={"Nacionalidad"} />
          <Info data={socio.cedula} nombre={"cedula"} />
          <Info data={socio.nfcId} nombre={"Carnet"} />
          <Info data={socio.fecha_nac.slice(0, 10)} nombre={"Fecha Nacimiento"} />
          <Info data={socio.estado_civ == 1 ? "Soltero" : "Casado"} nombre={"Estado Civil"} />
          <Info data={socio.profesion} nombre={"Profesion"} />
          <Info data={socio.nota} nombre={"nota"} />
          <Info data={socio.sexo == 1 ? "Masculino" : "Femenino"} nombre={"sexo"} />
        </div>
        <div className="w-1/2 flex flex-col gap-2  h-full">
          <Info data={socio.direccion} nombre={"Direccion"} />
          <Info data={socio.celular} nombre={"celular"} />
          <Info data={socio.telefonos} nombre={"telefono"} />
          <Info data={socio.e_mail} nombre={"Email"} />
          <Info data={socio.empresa_tra} nombre={"Profesion"} />
          <Info data={socio.rif_tra} nombre={"Rif Trabajo"} />
          <Info data={socio.telefonos_tra} nombre={"Telefono"} />
          <Info data={socio.nombre_rep} nombre={"Nombre Rep"} />
          <Info data={socio.telefonos_rep} nombre={"Telefono_rep"} />
        </div>
      </div>

    </section>
  )
}