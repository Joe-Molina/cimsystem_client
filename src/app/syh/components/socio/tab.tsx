'use client'


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import InfoSocios from "./tabSections/infoSocios"
import InfoFamiliares from '@/app/syh/components/socio/tabSections/infoFamiliares'
import Back from '@/app/syh/components/header/BackButton'
import Link from 'next/link'
import { useState } from 'react'



export function TabsDemo({ familiares, socio }: any) {

  const [loading, setLoading] = useState(false)

  const handleCLick2 = () => {
    setLoading(!loading)
    console.log(loading)
  }

  return (
    <Tabs defaultValue="Informacion personal" className="mx-3 mt-3">
      {
        loading ?
          <div className="font-bold text-3xl">cargando...</div>

          :
          <div>
            <div className="flex justify-between">
              <Back />
              <Link href={"/syh/facturas/" + socio.codigo} className="px-4 py-1 text-zinc-500  rounded-md m-4 hover:scale-105 transition shadow-md border border-zinc-300" onClick={handleCLick2}>facturas</Link>
            </div>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Informacion personal">Informacion personal</TabsTrigger>
              <TabsTrigger value="Familiares">Familiares</TabsTrigger>
            </TabsList>
            <TabsContent value="Informacion personal">
              <InfoSocios dataSocios={socio} />
            </TabsContent>
            <TabsContent value="Familiares">
              <InfoFamiliares dataFamiliares={familiares} />
            </TabsContent>
          </div>
      }
    </Tabs>
  )
}
