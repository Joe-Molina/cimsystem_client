import Image from "next/image"
import Link from "next/link"

interface cardSocio {
  nombre: string
  accion: string
  cedula: string
  tipo_socio: number
}

export const FichaCard: React.FC<cardSocio> = ({ nombre, accion, cedula, tipo_socio }) => {

  return (
    <Link className="flex flex-col h-80 w-52 border rounded-md p-2 transition hover:scale-105 z-10" href={`/informacion/socios/${accion}`}>
      <Image src={`http://10.10.1.2:8080/images_socios/${cedula}.jpg`} alt={"socio"} width={100} height={100} className="rounded-sm w-full overflow-hidden h-52" />
      <p className="text-sm text-start font-semibold">{nombre}</p>
      <p className="text-zinc-500 text-[12px]">{cedula}</p>
      <p className="text-zinc-500 text-[12px]">{tipo_socio == 1 ? "ORDINARIO" : "OTRO"}</p>
      <p className="text-end text-xl font-bold text-blue-500">{accion}</p>
    </Link>
  )
}