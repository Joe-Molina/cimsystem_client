import axios from "axios";
import { Buscador } from "./components/buscarSocio"
import { infoSocios, Socio } from "@/types";
import { InfoSocio } from "./components/InfoSocio"
import { InfoFamilia } from "./components/InfoFamilia";
// import { InfoPersonal } from "./components/datosPersonales";

export default async function SociosJunta({ params }: { params: { accion: string } }) {
  try {
    const socios: Socio[] = (await axios.get('http://10.10.1.4:3000/socios')).data

    const socio: infoSocios = (await axios.get(`http://10.10.1.4:3000/socios/info/${params.accion}`)).data

    const sociosSin0 = socios.filter(i => i.accion !== "00000")

    console.log(socio)

    return (
      <section className="flex flex-row h-full mx-5 my-5 border border-zinc-300 rounded-xl overflow-hidden">
        <article className="h-full flex  w-1/6 border-r border-zinc-300 rounded-l-xl overflow-hidden">
          <Buscador socios={sociosSin0} />
        </article>
        <article className=" flex w-5/6 h-full rounded-r-xl">
          <InfoSocio data={socio} />
          <InfoFamilia data={socio} />
        </article>
      </section>

    );
  } catch (error: unknown) {
    return (
      <div className="h-full text-center py-20 flex flex-col justify-start mt-32 items-center">
        <div className="bg-zinc-950 shadow-sm p-11 rounded-lg text-zinc-50">
          <h1>Hubo un error al cargar los socios de la Junta</h1>
          <p>Contacte con Soporte para corregir el problema</p>
          <p>Error: {error?.toString()}</p>
        </div>
      </div>
    )
  }
}
