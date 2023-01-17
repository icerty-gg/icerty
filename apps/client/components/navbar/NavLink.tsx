'use client'

import clsx from 'clsx'
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
        'relative z-20 gap-[0.2rem] h-full transition-all duration-300 hover:text-sky-500 text-xl flex flex-col items-center p-4',
        pathname === href ? 'text-sky-500' : 'text-slate-200',
        isSmallerNavbar && 'pt-[22px] pb-0'
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
