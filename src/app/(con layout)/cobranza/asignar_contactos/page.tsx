import React from 'react'
import { Cobranza_info} from '../components/DataTable'
import axios from 'axios'
import { Toaster } from 'sonner'
import { AsignarContactos } from './components/AsignarContactos'

export default async function Page() {


  const data: Cobranza_info[] = (await axios('http://10.10.1.4:3000/cobranza')).data

  const dataFilter = data.filter(socio => socio.deuda_total > 0)


  return (
    <div className='bg-slate-100 h-full p-7'>

      <Toaster />
      <AsignarContactos socios={dataFilter}/>
    </div>
  )
}
