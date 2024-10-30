import { IconHeader } from "./Icon";

export function NavSide() {

  return (
    <header className="[grid-area:aside] flex-col h-screen flex items-center text-white border-r border-neutral-300 bg-white">
      <IconHeader href="/cumples" linkPhoto="/iconos/header/cumple.svg" text="Cumpleaños socios" />
      <IconHeader href="/information/socios/00001" linkPhoto="/iconos/header/person.svg" text="Ficha Socios" />
      <IconHeader href="/syh/socios" linkPhoto="/iconos/header/syh.svg" text="SyH" />
      <IconHeader href="/mediacim" linkPhoto="/iconos/header/monitor.svg" text="MediaCim" />
    </header>
  )
}