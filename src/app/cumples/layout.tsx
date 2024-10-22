import { IconHeader } from "../components/Icon";
import "../globals.css";


export default async function RootLayout2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thumb-zinc-700 scrollbar-track-white">
      <body>
        <main id="app" className="relative max-h-screen h-screen">
          <header className="[grid-area:aside] flex-col flex items-center overflow-y-auto text-white border-r border-neutral-300">
            <IconHeader href="/cumples" linkPhoto="/iconos/header/cumple.svg" text="Cumpleaños socios" />
            <IconHeader href="/information/socios/00001" linkPhoto="/iconos/header/person.svg" text="Informacion socios" />
            <IconHeader href="/syh" linkPhoto="/iconos/header/syh.svg" text="SyH" />
            <IconHeader href="/mediacim" linkPhoto="/iconos/header/monitor.svg" text="MediaCim" />
          </header>
          <article className="[grid-area:main]overflow-auto">
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}

