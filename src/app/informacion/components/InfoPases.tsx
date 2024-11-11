'use client'

import { pases } from "@/types"
import { PhotoPase } from "./PasesPhotoCard";


interface infoPases {
  pases: pases[]
}

export const InfoPases: React.FC<infoPases> = ({ pases }) => {

  return (
    <section className="flex gap-2 h-[45vh]">


      <div className="flex flex-row justify-evenly flex-wrap items-start w-full gap-5 border p-3 rounded-lg overflow-y-auto">
        {
          pases.map((pase: pases, index) => (
            <PhotoPase pase={pase} key={index} />
          ))
        }
      </div>

    </section>
  )
}