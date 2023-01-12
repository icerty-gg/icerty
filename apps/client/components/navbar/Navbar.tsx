'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRef } from 'react'
import { BiHomeAlt, BiBriefcase, BiHeart, BiPlus, BiUser } from 'react-icons/bi'

import { useCheckScroll } from '../../hooks/useCheckScroll'
import Logotype from '../../public/logo.svg'
import { PrimaryLink } from '../ui/primary-button/PrimaryLink'

import { NavLink } from './NavLink'

interface Props {
  readonly className?: string
  readonly isHidden?: boolean
}

export const Logo = ({ className, isHidden }: Props) => (
  <Link className={clsx('text-xl text-white font-bold max-lg:hidden flex items-center gap-4', className)} href='/'>
    <Logotype className={clsx('transition-all w-12', isHidden && 'w-10')} />
    <h1 className={clsx('transition-opacity', isHidden && 'opacity-0')}>Icerty</h1>
  </Link>
)

export const Navbar = () => {
  const isSmallerNavbar = useCheckScroll(80)
  const navbarRef = useRef<HTMLElement | null>(null)

  return (
    <>
      <nav
        ref={navbarRef}
        className={clsx(
          'fixed text-center bg-gray-900/90 backdrop-blur w-full h-20 flex items-center border-b border-slate-300/10 z-30 transition-all supports-backdrop-blur:bg-white/95',
          isSmallerNavbar && 'h-16'
        )}
      >
        <div
          className={clsx(
            'w-full transition-all px-8 my-0 flex flex-wrap items-center justify-between max-lg:justify-center mx-auto max-w-screen-2xl'
          )}
        >
          <Logo isHidden={isSmallerNavbar} />
          <div className='flex items-center'>
            <NavLink href='/'>
              <BiHomeAlt />
            </NavLink>
            <NavLink href='/offers'>
              <BiBriefcase />
            </NavLink>
            <NavLink href='/followed'>
              <BiHeart />
            </NavLink>
            <NavLink href='/login'>
              <BiUser />
            </NavLink>
            <NavLink href='/add-offer'>
              <BiPlus />
            </NavLink>
          </div>

          <div className='flex gap-3 items-center text-sm max-lg:hidden'>
            <PrimaryLink href='/register'>
              <BiUser className='text-xl' /> Sign in
            </PrimaryLink>
          </div>
        </div>
      </nav>
    </>
  )
}
