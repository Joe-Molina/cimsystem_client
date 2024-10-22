import "../globals.css";

export default async function RootLayout2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thumb-zinc-700 scrollbar-track-white">
      <body>
        <main className="flex flex-row w-screen h-screen overflow-hidden ">
          {children}
        </main>
      </body>
    </html>
  );
}
