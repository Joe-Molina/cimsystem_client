import React from 'react'
import { Cobranza_info, DataTableDemo } from './components/DataTable'
import axios from 'axios'

export default async function Page() {

  const data: Cobranza_info[] = (await axios('http://localhost:3000/cobranza')).data

  const dataFilter = data.filter(socio => socio.deuda_total > 0 socio.)

  return (
    <div>
      <DataTableDemo data={dataFilter} />
    </div>
  )
}
