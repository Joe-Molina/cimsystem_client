import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { PostsProvider } from "./inicio/context/PostProvider";
import { IpProvider } from "./inicio/context/IpProvider";
import { NavSide } from "../components/Nav";

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
        <IpProvider>
          <PostsProvider>
            <main id="app" >
              <NavSide />
              {children}
            </main>
            <Toaster />
          </PostsProvider>
        </IpProvider>
      </body>
    </html>
  );
}
