import Link from "next/link";
// import Image from "next/image";
import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup } from '@fortawesome/free-solid-svg-icons'


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface IconInterface {
  icon: IconLookup
  text: string
  href: string
}

export function IconHeader({ text, href, icon }: IconInterface) {



  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="flex justify-center items-center h-16  text-zinc-400"><FontAwesomeIcon icon={icon} className="h-7 w-7 text-zinc-400 hover:text-blue-500" /></Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}