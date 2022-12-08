import '../styles/globals.css'
import { Inter } from '@next/font/google'

import { Navbar } from '../components/navbar/Navbar'
import { Wrapper } from '../components/ui/Wrapper'

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
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export default RootLayout
