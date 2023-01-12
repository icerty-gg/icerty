'use client'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from '@next/font/google'
import { BiArrowBack } from 'react-icons/bi'
import { ToastContainer } from 'react-toastify'

import { Navbar } from '../components/navbar/Navbar'
import { UserContextProvider } from '../context/UserContext'
import { useCheckScroll } from '../hooks/useCheckScroll'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => {
  const isVisible = useCheckScroll(800)

  return (
    <html className={`${roboto.variable} font-sans`} lang='en'>
      <body className='bg-gray-900 relative'>
        <UserContextProvider>
          <Navbar />
          <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 max-md:px-4 py-24 pt-32'>
            {children}
            <div className='absolute top-28 right-0 w-[50rem] h-[50rem] rounded-full blur-[250px] pointer-events-none bg-sky-500 opacity-10' />
          </div>
          <button
            className={`fixed bottom-12 right-4 transition-transform ${
              isVisible ? 'translate-x-[0]' : 'translate-x-[150%]'
            } flex gap-2 items-center text-white bg-sky-500/10 hover:bg-sky-400/20 py-2 px-4 rounded-full border border-slate-300/10`}
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <BiArrowBack className='rotate-90' />
            <p>Top</p>
          </button>
          <ToastContainer />
        </UserContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
