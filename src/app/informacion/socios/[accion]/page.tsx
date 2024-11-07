import axios from "axios";
// import { Buscador } from "../../components/buscarSocio"
import { infoSocios, Socio } from "@/types";
// import { InfoSocio } from "../../components/InfoSocio"
// import { InfoFamilia } from "../../components/InfoFamilia";
import { BuscarSocios } from "../components/buscarSocioDesdeFicha";

export default async function SociosJunta({ params }: { params: { accion: string } }) {
  try {
    const socios: Socio[] = (await axios.get('http://10.10.1.4:3000/socios')).data

    const socio: infoSocios = (await axios.get(`http://10.10.1.4:3000/socios/info/${params.accion}`)).data

    const sociosSin0 = socios.filter(i => i.accion !== "00000" || "000000" || "0000")


    return (
      <article className="[grid-area:main]">
        <div className="w-full bg-white border-b border-zinc h-12 font-bold flex justify-center items-center text-blue-500">Ficha Socios</div>
        <BuscarSocios socios={sociosSin0} data={socio} />
      </article>

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
