import React from 'react'
import { Cobranza_info, DataTableDemo } from './components/DataTable'
import axios from 'axios'
import { Toaster } from 'sonner'

export default async function Page() {


  const data: Cobranza_info[] = (await axios('http://10.10.1.4:3000/cobranza')).data

  const dataFilter = data.filter(socio => socio.deuda_total > 0)

  return (
    <div>
      <Toaster />
      <DataTableDemo data={dataFilter} />
    </div>
  )
}
