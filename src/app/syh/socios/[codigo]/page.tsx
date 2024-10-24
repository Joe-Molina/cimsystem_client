import { TabsDemo } from '@/app/syh/components/socio/tab'
import React from 'react'

async function socioPage({ params: { codigo } }: { params: { codigo: string } }) {


  const data = await fetch(`http://localhost:3002/socio/${codigo}`)

  const { familiares, socio } = await data.json()


  return (
    <div>
      <TabsDemo familiares={familiares} socio={socio} />
    </div>
  )
}

export default socioPage