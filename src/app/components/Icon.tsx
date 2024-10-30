import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface IconInterface {
  linkPhoto: string
  text: string
  href: string
}


export function IconHeader({ linkPhoto, text, href }: IconInterface) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="h-12 p-3 border-b border-neutral-300 "><Image src={linkPhoto} className="transition" alt="cumple" width={35} height={35} ></Image></Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}