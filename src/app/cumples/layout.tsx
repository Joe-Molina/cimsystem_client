import { NavSide } from "../components/Nav";
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
          <NavSide />
          <article className="[grid-area:main]overflow-auto">
            <div className="w-full bg-white border-b border-zinc h-12 font-bold flex justify-center items-center text-blue-500">Cumples Socios</div>
            <div className='flex w-full flex-col mx-auto h-[93vh] overflow-y-auto'>
              {children}
            </div>
          </article>
        </main>
      </body>
    </html>
  );
}

