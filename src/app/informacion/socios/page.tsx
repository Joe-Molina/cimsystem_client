import { Socio } from "@/types"
import axios from "axios"
import { HomeSocios } from "./components/home"

export default async function Socios() {

  const socios: Socio[] = (await axios.get('http://10.10.1.4:3000/socios')).data

  const filterSocios = socios.filter(socio => socio.accion !== "00000" ? true : false)

  return (
    <article className="[grid-area:main]">
      <div className="w-full bg-white border-b border-zinc h-12 font-bold flex justify-center items-center text-blue-500">Ficha Socios</div>
      <HomeSocios socios={filterSocios} />
    </article>
  )
}