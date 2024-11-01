import Image from "next/image";
import Link from "next/link";

interface linkCard {
  nombre: string
  url: string
  img: string
}

function LinkCard({ url, nombre }: linkCard) {

  return (
    <Link href={url} className="" >
      <div className='flex flex-col w-96 h-56 items-center justify-between rounded-md shadow-md  bg-gradient-to-br from-green-100 to-green-200 text-green-500 text-3xl font-thin hover:scale-105 transition' >
        <div className="font-normal w-full flex p-5 items-center  h-1/6">{nombre}</div>
      </div>
    </Link>
  )
}

export default function Home() {



  return (
    <main>
      <header className=" flex items-center h-16 w-full shadow-sm bg-slate-50">
        <Image src={"/fotos/logocim.png"} alt={"logo"} width={50} height={50} className="ml-3" />
        <p className="font-bold text-2xl ml-3">CIMSystem</p>
      </header>
      <article className="h-full p-5 flex flex-wrap justify-center mt-20 gap-10">
        <LinkCard url='/syh/socios' img="/fotos/cim.jpg" nombre="syh" />
        <LinkCard url='/informacion/socios/' img="/fotos/cim.jpg" nombre="informacion sobre socios" />
        <LinkCard url='/cumples' img="/fotos/cim.jpg" nombre="cumpleanos socios" />
        <LinkCard url='/cobranza' img="/fotos/cim.jpg" nombre="cobranza" />
        <LinkCard url='/mediacim' img="/fotos/cim.jpg" nombre="Mediacim" />
      </article>
    </main>

  );
}
