import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NavSide } from "@/app/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEDIA CIM WEB",
  description: "Publicidades mediaCIM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className={inter.className}>

        <main id="app" >
          <NavSide />
          {children}
        </main>

      </body>
    </html>
  );
}
