'use client'

import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { BiMenu, BiHomeAlt, BiBriefcase, BiHeart, BiAddToQueue } from 'react-icons/bi'

import { useCheckScroll } from '../../hooks/useCheckScroll'
import { useToggle } from '../../hooks/useToggle'
import { PrimaryButton } from '../ui/PrimaryButton'

import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'
import { NavLink } from './NavLink'

export const Navbar = () => {
  const isOpenMiniNav = useCheckScroll(80)
  const [isOpenNav, toggleOpenNav] = useToggle()
  const navbarRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  return (
    <>
      <nav
        ref={navbarRef}
        className='sticky max-lg:fixed text-center bg-gray-900/75 backdrop-blur w-full h-20 flex items-center  border-b border-slate-300/10 z-30 supports-backdrop-blur:bg-white/95'
      >
        <div className='max-w-screen-2xl w-full px-8 my-0 flex flex-wrap items-center justify-between mx-auto'>
          <Logo isSmall={false} />
          <div className='flex items-center max-lg:hidden mr-8'>
            <NavLink
              icon={
                <BiHomeAlt
                  className={`text-lg transition-all ${
                    pathname === '/' ? 'translate-x-[0] opacity-100' : 'translate-x-[2rem] opacity-0'
                  }`}
                />
              }
              title='Main Page'
              href='/'
            />
            <NavLink
              icon={
                <BiBriefcase
                  className={`text-lg transition-all ${
                    pathname === '/offers' ? 'translate-x-[0] opacity-100' : 'translate-x-[2rem] opacity-0'
                  }`}
                />
              }
              title='Offers'
              href='/offers'
            />
            <NavLink
              icon={
                <BiHeart
                  className={`text-lg transition-all ${
                    pathname === '/followed' ? 'translate-x-[0] opacity-100' : 'translate-x-[2rem] opacity-0'
                  }`}
                />
              }
              title='Followed'
              href='/followed'
            />
            <NavLink
              icon={
                <BiAddToQueue
                  className={`text-lg transition-all ${
                    pathname === '/add-offer' ? 'translate-x-[0] opacity-100' : 'translate-x-[2rem] opacity-0'
                  }`}
                />
              }
              title='Add Offer'
              href='/add-offer'
            />
          </div>

          <button
            className='hidden max-lg:flex p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'
            onClick={toggleOpenNav}
          >
            <BiMenu className='text-white text-2xl' />
          </button>

          <div className='flex gap-3 items-center text-sm max-lg:hidden'>
            <PrimaryButton href='/login'>Login</PrimaryButton>
          </div>
        </div>
      </nav>

      <MobileNavbar isOpened={isOpenNav} onOpenNav={toggleOpenNav} />

      {isOpenNav && <div onClick={toggleOpenNav} className='fixed top-0 z-40 left-0 w-full h-full bg-black/40' />}

      <nav
        className={`fixed w-full flex duration-300 text-center justify-center items-center z-50 transition-transform max-lg:hidden ${
          isOpenMiniNav ? 'translate-y-[-3.7rem]' : 'translate-y-[-10rem]'
        }`}
      >
        <div className='flex gap-2 items-center bg-gray-900/75 backdrop-blur p-2 rounded-full border-slate-300/10 border'>
          <Logo isSmall={true} className='mr-4' />
          <NavLink isMobile={true} title='Main Page' href='/' />
          <NavLink isMobile={true} title='Offers' href='/offers' />
          <NavLink isMobile={true} title='Followed' href='/followed' />
          <NavLink isMobile={true} title='Add Offer' href='/add-offer' />
          <PrimaryButton className='text-sm ml-4' href='/login'>
            Login
          </PrimaryButton>
        </div>
      </nav>
    </>
  )
}
