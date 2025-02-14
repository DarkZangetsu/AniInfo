import { Roboto } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: "AniInfo",
  description: "Anime Info WebSite",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${roboto.variable} bg-[#121212] text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}