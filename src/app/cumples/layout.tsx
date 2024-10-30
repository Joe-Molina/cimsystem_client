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
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}

