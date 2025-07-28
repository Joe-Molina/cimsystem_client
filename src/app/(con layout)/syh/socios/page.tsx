import { SocioSyh } from "@/types"
import axios from "axios"
import { HomeSocios } from "@/app/(con layout)/syh/socios/components/home"

export default async function Socios() {

  const socios: SocioSyh[] = (await axios.get('http://10.10.1.4:3010/socios')).data

  const filterSocios = socios.filter(socio => socio.codigo !== "00000" && socio.codigo !== "0000" ? true : false)

  return (
    <article>
      <HomeSocios socios={filterSocios} />
    </article>
  )
}