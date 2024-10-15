import Link from "next/link";

export function HeaderNav() {


  return (
    <div className="w-full text-zinc-600 font-medium text-sm flex flex-row pl-10 items-center h-10">
      <ul className="flex flex-row gap-5 pr-2 ">
        <Link className="hover:text-zinc-950 transition" href={'/'}>Home</Link>
        <Link className="hover:text-zinc-950 transition" href={'/cumples'}>Cumple</Link>
        <Link className="hover:text-zinc-950 transition" href={'/cobranza'}>Cobranza</Link>
        <Link className="hover:text-zinc-950 transition" href={'/socios-junta/00001'}>Socios</Link>
      </ul>
    </div>
  )
}