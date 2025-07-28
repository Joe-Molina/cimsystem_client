import Image from "next/image";
import { FormSession } from "../components/FormSession";

export default function Home() {



  return (
    <div className="w-full h-full flex justify-center bg-gradient-to-br from-slate-800 to-cyan-900 items-center ">
      <section className=" flex h-4/5 w-5/6 bg-white rounded-lg shadow-xl hover:scale-105 transition">
        <Image src="/fotos/cim.jpg" alt="tumama" className="w-1/2 h-full rounded-l-md" width={800} height={800} />
        <article className="flex flex-col items-center justify-center center w-1/2 h-full rounded-r-md bg- p-3 ">
          <Image src="/fotos/logocim.png" alt="tumama" width={100} height={100} />
          <h1 className="font-bold text-3xl my-2">CIMSystem</h1>
          <FormSession />
        </article>
      </section>

    </div>

  );
}
