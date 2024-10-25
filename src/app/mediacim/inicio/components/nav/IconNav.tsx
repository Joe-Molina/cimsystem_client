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
          <div className='opacity-50 hover:opacity-100 transition bg-neutral-950 hover:bg-neutral-900 m-1 p-2 rounded-sm absolute md:static right-0 top-0'>
            <Image src={url} alt={alt} width={30} height={30} />
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
