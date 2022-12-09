import '../styles/globals.css'
import { Inter } from '@next/font/google'

import { Navbar } from '../components/navbar/Navbar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <html className={`${inter.variable} font-sans`} lang='en'>
      <body className='bg-gray-900'>
        <Navbar />
        <div className='pt-36'>{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
