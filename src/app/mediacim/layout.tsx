import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PostsProvider } from "./inicio/context/PostProvider";
import { IpProvider } from "./inicio/context/IpProvider";

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
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </PostsProvider>
        </IpProvider>
      </body>
    </html>
  );
}
