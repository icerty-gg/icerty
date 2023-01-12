'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useCheckScroll } from '../../hooks/useCheckScroll'

import type { ReactNode } from 'react'

interface Props {
  readonly children: ReactNode
  readonly href: string
}

export const NavLink = ({ children, href }: Props) => {
  const pathname = usePathname()
  const isSmallerNavbar = useCheckScroll(80)

  return (
    <Link
      className={clsx(
        'gap-2 h-full max-lg:p-6 transition-all hover:text-sky-500 relative last-of-type:border-transparent text-xl',
        pathname === href ? 'text-sky-500' : 'text-slate-200',
        isSmallerNavbar ? 'p-6' : 'p-8'
      )}
      href={href}
    >
      {children}
      {pathname === href && (
        <motion.span layoutId='rect' className='absolute w-full h-[0.2rem] bottom-0 left-0 rounded-full bg-sky-500' />
      )}
    </Link>
  )
}
