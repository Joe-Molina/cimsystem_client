'use client'


import { familiarSYH } from "@/types"
import { PhotoFamiliar } from "./photoFamiliar"



interface infoFamiliaPases {
  familiares: familiarSYH[]
}

export const InfoFamilia: React.FC<infoFamiliaPases> = ({ familiares }) => {

  return (
    <section className="flex gap-2 h-[45vh]">

      <div className="flex flex-row justify-evenly items-start flex-wrap w-full gap-5 border p-3 rounded-lg overflow-y-auto">
        {
          familiares.map((familiar: familiarSYH, index) => (
            <PhotoFamiliar familiar={familiar} key={index} />
          ))
        }
      </div>

    </section>
  )
}