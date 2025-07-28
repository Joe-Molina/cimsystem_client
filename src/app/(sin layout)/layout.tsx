import type { Metadata } from "next";
import "../globals.css";

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

      >
        <div className="flex flex-col h-screen">
          <div className="flex justify-between items-center px-12 h-12 shadow-lg">

          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
