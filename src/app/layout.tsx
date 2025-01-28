import type { Metadata } from "next";
import localFont from "next/font/local";
// import { HeaderNav } from "./components/headerNav";
import "@/app/globals.css";
import Image from "next/image";
import { NavigationMenuDemo } from "./components/MenuBar";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CimSystem",
  description: "CimSystem By Joe Molina",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
          <div className="flex justify-between items-center px-12 h-12 shadow-lg">
            <div className="flex items-center gap-4">
              <Image src={'/fotos/logocim.png'} alt="" width={40} height={40} ></Image>
              <Link href={'/'} className="font-bold text-xl">CIMSystem</Link>
            </div>

            <NavigationMenuDemo />

          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
