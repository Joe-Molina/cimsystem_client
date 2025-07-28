/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function IconNavLink({ message }: any) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link className=' transition py-1 px-4 rounded-sm  border border-zinc-300 text-sm shadow-sm' href={'/mediacim/vista'}>
            modo vista
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
