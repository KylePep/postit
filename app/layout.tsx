import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets:["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-300`}>
        <QueryWrapper>  
        <Nav/>
        <Toaster/>
        {children}
        </QueryWrapper>
        </body>
    </html>
  );
}
