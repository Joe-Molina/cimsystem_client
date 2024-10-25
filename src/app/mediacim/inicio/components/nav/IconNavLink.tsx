/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function IconNavLink({ url, alt, message }: any) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link className='opacity-50 hover:opacity-100 transition bg-neutral-950 hover:bg-neutral-900 m-1 p-2 rounded-sm absolute md:static right-12' href={'/mediacim/vista'}>
            <Image src={url} alt={alt} width={30} height={30} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
