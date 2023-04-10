import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from '@next/font/google'
import { Suspense } from 'react'

import { Providers } from '../components/Providers'
// import { ToastContainer } from '../components/ToastContainer'
import { Navbar } from '../components/navbar/Navbar'

import Loading from './loading'

import type { ReactNode } from 'react'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const RootLayout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <html className={`${roboto.variable} font-sans`} lang='en'>
      <body className='bg-gray-900 relative'>
        <Providers>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <main className='max-w-screen-2xl w-full my-0 mx-auto px-8 max-md:px-4 py-32'>
              {children}
              <div className='absolute top-28 right-0 w-[50rem] h-[50rem] rounded-full blur-[250px] pointer-events-none bg-sky-500 opacity-10' />
            </main>
          </Suspense>
          {/* <ToastContainer /> */}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
