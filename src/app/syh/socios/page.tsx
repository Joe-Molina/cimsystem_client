import { SocioSyh } from "@/types"
import axios from "axios"
import { HomeSocios } from "@/app/syh/socios/components/home"

export default async function Socios() {

  const socios: SocioSyh[] = (await axios.get('http://10.10.1.4:3010/socios')).data

  const filterSocios = socios.filter(socio => socio.codigo !== "00000" && socio.codigo !== "0000" ? true : false)

  return (
    <article className="[grid-area:main]">
      <div className="w-full bg-white border-b border-zinc h-12 font-bold flex justify-center items-center text-blue-500">Ficha Socios SYH</div>
      <HomeSocios socios={filterSocios} />
    </article>
  )
}