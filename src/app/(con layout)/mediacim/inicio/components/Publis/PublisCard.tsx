/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { verificarEstadoActividad } from '@/app/(con layout)/mediacim/inicio/services/verificarActividad'
import Image from 'next/image'
import { usePostsContext } from '../../hooks/usePosts'
import { toast } from 'sonner'
import { ImgOrVideo } from './PublisCard/components/ImgOrVideo';
import { EditPopover, DatePickerWithRange } from './PublisCard/components/EditPopover';
import { serviceDeletePost } from '../../services/Posts';
import { useIpContext } from '../../hooks/useIp'
import { useEffect } from 'react'

export const PubliCard = ({ publi }: any) => {
  const { IpState } = useIpContext()
  const { deletePost } = usePostsContext()

  const handleClickDetele = async () => {
    const date = new Date
    const datos = await serviceDeletePost(IpState, publi.id)
    if (datos) {
      deletePost(publi.id);
      toast(`${publi.name} ha sido borrado`, {
        description: date.toLocaleString()
      })
    }
  }

  useEffect(() => {
    console.log(publi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex h-52 rounded-sm border border-neutral-200 bg-slate-50'>
      <ImgOrVideo publi={publi} />

      <div className='flex flex-col  justify-between  p-3 w-60 max-w-80'>
        <div className='flex w-full border-b  justify-between'>
          <p className=' inline-block text-blue-500 font-bold text-xl overflow-hidden max-h-7'>{publi.name}</p>
          {/* activity status */}
          {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <div className='w-2 h-2 bg-green-700 rounded-full'> </div> : <div className='w-2 h-2 bg-red-700 rounded-full'></div>}
        </div>
        <div className='flex w-full justify-between'>
          {/* position */}
          <div className='text-blue-500 font-bold bg-white  border border-neutral-200 w-20 h-20 flex justify-center items-center rounded-sm text-3xl'>{publi.position > 0 ? publi.position + ".º" : '-'}</div>

          {/* duration  */}
          <p className=' text-blue-500 font-bold  border bg-white border-neutral-200 w-20 h-20  flex justify-center items-center rounded-sm text-3xl'>{publi.duration / 1000 + "s"}</p>

          <div className=' flex flex-col justify-between'>
            <EditPopover publi={publi} ip={IpState} />
            <button className=' bg-blue-500 w-9 h-9 flex justify-center items-center rounded-sm hover:bg-blue-600 transition' onClick={() => { handleClickDetele(); }} ><Image src='/iconos/delete.svg' alt='' width={20} height={20} /></button>
          </div>

        </div>
        <DatePickerWithRange fechaFin={publi.Fecha_Fin} fechaInicio={publi.fecha_inicio} id={publi.id} />
      </div >
    </div>
  )
}