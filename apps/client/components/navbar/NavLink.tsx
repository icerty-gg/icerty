'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  readonly href: string
  readonly isMobile?: boolean
  readonly title: string
}

export const NavLink = ({ href, isMobile, title }: Props) => {
  const pathname = usePathname()
  const p = pathname === href

  return !isMobile ? (
    <Link
      className={`${
        p ? 'text-sky-600' : 'text-slate-200'
      } hover:text-sky-500  relative font-bold  last-of-type:border-transparent p-2 px-4 transition-colors text-sm`}
      href={href}
    >
      {title}
      {p && (
        <motion.span
          layoutId='rect'
          className='absolute w-full h-full bottom-0 left-0 bg-sky-500 rounded-full bg-sky-400/10 border border-slate-800 shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500'
        />
      )}
    </Link>
  ) : (
    <Link
      className={`${
        p ? 'text-sky-600' : 'text-slate-200'
      } hover:text-sky-500  relative font-bold last-of-type:border-transparent p-2 px-4 transition-colors text-sm`}
      href={href}
    >
      {title}
    </Link>
  )
}
