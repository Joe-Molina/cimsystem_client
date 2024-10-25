'use client'

import { familiares, InfoSociosProps, pases } from "@/types"
import { PhotoFamiliar } from "./FamiliarinfoCard";
import { PhotoPase } from "./PasesPhotoCard";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function Info({ data, nombre }: any) {

//   return (
//     <article className="font-bold border border-zinc-300 rounded-lg mx-2">
//       <div className="p-1 mx-2">{nombre} <p className="font-medium">{data}</p> </div>
//     </article>
//   )
// }

export const InfoFamilia: React.FC<InfoSociosProps> = ({ data }) => {

  const { familiares, pases } = data;

  console.log(familiares, pases);
  return (
    <section className="flex flex-col items-center w-1/2 h-full  gap-2  m-10 ">

      <div className="flex flex-col w-full h-full overflow-y-auto text-zinc-800">

        <div className="flex flex-col gap-2 w-full  h-1/2 border-b-2 pb-4">
          <h2 className="font-bold text-2xl">FAMILIARES</h2>
          <div className="flex flex-row justify-evenly flex-wrap w-full gap-5  overflow-y-auto">
            {
              familiares.map((familiar: familiares, index) => (
                <PhotoFamiliar familiar={familiar} key={index} />
              ))
            }
          </div>

        </div>
        <div className="flex flex-col gap-2 w-full  h-1/2  pb-14">
          <h2 className="font-bold text-2xl">PASES</h2>
          <div className="flex flex-row justify-evenly flex-wrap w-full gap-5  overflow-y-auto">
            {
              pases.map((pase: pases, index) => (
                <PhotoPase pase={pase} key={index} />
              ))
            }
          </div>

        </div>
      </div>

    </section>
  )
}