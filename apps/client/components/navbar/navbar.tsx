import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../img/logo.svg'

export const Navbar = () => {
  return (
    <nav className='bg-gray-900 w-full h-20 flex items-center backdrop-blur-md'>
      <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 flex items-center justify-between'>
        <Link className='text-white text-lg font-bold flex items-center gap-4' href='/'>
          <Logo className='w-12' />
          Icerty
        </Link>

        <div className='flex gap-3 items-center text-sm'>
          <Link
            className='text-white border border-slate-800 hover:bg-slate-800  hover:border-sky-500 transition-all px-6 py-2 rounded-lg'
            href='/dodaj-ogłoszenie'
          >
            Dodaj ogłoszenie
          </Link>
          <Link
            className='text-white border-transparent bg-sky-500  hover:bg-sky-400 px-6 py-2 rounded-lg transition-all'
            href='/zaloguj'
          >
            Zaloguj
          </Link>
        </div>
      </div>
    </nav>
  )
}
