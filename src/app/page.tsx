import Image from "next/image";
import Link from "next/link";

interface linkCard {
  nombre: string
  url: string
  img: string
}

function LinkCard({ url, img, nombre }: linkCard) {

  return (
    <Link href={url} className="" >
      <div className='flex flex-col h-72 w-56 items-center justify-between rounded-md shadow-xl  bg-stone-950 text-white hover:scale-105 transition' >
        <div className="font-bold w-full flex justify-center items-center  h-1/6">{nombre}</div>
        <Image src={img} alt={"logo"} width={400} height={400} className="w-full h-5/6 rounded-b-md " />
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
      <article className="h-full p-5 flex justify-center mt-20 gap-7">

        <LinkCard url='/syh/socios' img="/fotos/cim.jpg" nombre="syh" />
        <LinkCard url='/cumples' img="/fotos/cim.jpg" nombre="cumple" />
        <LinkCard url='/cobranza' img="/fotos/cim.jpg" nombre="cobranza" />
        <LinkCard url='/otracosa' img="/fotos/cim.jpg" nombre="syh" />
      </article>
    </main>

  );
}
