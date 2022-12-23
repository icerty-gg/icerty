'use client'

import '../styles/globals.css'
import { Roboto } from '@next/font/google'

import { Navbar } from '../components/navbar/Navbar'
import { BackToTopButton } from '../components/ui/BackToTopButton'
import { BluredCircle } from '../components/ui/BluredCircle'
import { Wrapper } from '../components/ui/Wrapper'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <html className={`${roboto.variable} font-sans`} lang='en'>
      <body className='bg-gray-900 relative'>
        <Navbar />
        <Wrapper>
          <div className='py-24'>
            {children}
            <BluredCircle />
          </div>
        </Wrapper>
        <BackToTopButton />
      </body>
    </html>
  )
}

export default RootLayout
