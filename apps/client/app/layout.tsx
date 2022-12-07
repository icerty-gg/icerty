import '../styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <html className={`${inter.variable} font-sans`} lang='en'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
