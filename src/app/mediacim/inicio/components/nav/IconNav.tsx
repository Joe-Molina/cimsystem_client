/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Form } from '../Form'

const Icon = ({ url, alt, message }: any) => {

  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='border transition m-1 p-1  rounded-sm '>
            <Image src={url} alt={alt} width={25} height={25} className='opacity-50 hover:opacity-100 transition' />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function IconNavFunction({ url, alt, message }: any) {


  return (
    <Sheet>
      <SheetTrigger ><Icon url={url} alt={alt} message={message} /></SheetTrigger>
      <Form />
    </Sheet>

  )
}
