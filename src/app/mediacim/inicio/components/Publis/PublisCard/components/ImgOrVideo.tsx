/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useIpContext } from '@/app/mediacim/inicio/hooks/useIp'
import React from 'react'

export const ImgOrVideo = ({ publi }: any) => {
  const { IpState } = useIpContext()
  return (
    <div className='relative h-56 mx-auto bg-black overflow-hidden flex'>
      {
        (publi.type !== "video") ?
          <div className='h-56 w-40 mx-auto bg-black overflow-hidden flex'>
            <a href={IpState + '/fotos/' + publi.name} target='_blank'>
              <img src={IpState + '/fotos/' + publi.name} alt="" className='mx-auto h-full' />
            </a>
          </div>
          :
          <video src={IpState + '/fotos/' + publi.name} controls ></video>
      }
    </div>
  )
}
