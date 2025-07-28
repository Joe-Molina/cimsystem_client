/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useIpContext } from '@/app/(con layout)/mediacim/inicio/hooks/useIp'
import React from 'react'

export const ImgOrVideo = ({ publi }: any) => {
  const { IpState } = useIpContext()
  return (
    <div className='relative h-full overflow-hidden flex'>
      {
        (publi.type !== "video") ?
          <div className=''>
            <a href={IpState + '/fotos/' + publi.name} target='_blank'>
              <img src={IpState + '/fotos/' + publi.name} alt="" className=' h-full w-32 p-2 rounded-xl' />
            </a>
          </div>
          :
          <video src={IpState + '/fotos/' + publi.name} controls ></video>
      }
    </div>
  )
}
