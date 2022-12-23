'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  readonly href: string
  readonly icon?: React.ReactNode
  readonly isMobile?: boolean
  readonly title: string
}

export const NavLink = ({ href, icon, isMobile, title }: Props) => {
  const pathname = usePathname()

  if (isMobile) {
    return (
      <Link
        className={`${
          pathname === href ? 'text-sky-600' : 'text-slate-200'
        } flex items-center gap-2 hover:text-sky-500 relative last-of-type:border-transparent p-2 px-4 transition-colors text-sm`}
        href={href}
      >
        {icon} {title}
      </Link>
    )
  }

  return (
    <Link
      className={`${
        pathname === href ? 'text-sky-600 ml-4' : 'text-slate-200'
      } flex items-center gap-2 transition-all hover:text-sky-500 relative last-of-type:border-transparent p-2 px-4 text-sm`}
      href={href}
    >
      {icon}
      {title}
      {pathname === href && (
        <motion.span
          layoutId='rect'
          className='absolute w-full h-full bottom-0 left-0 rounded-full bg-sky-400/10 border border-slate-800 shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500'
        />
      )}
    </Link>
  )
}
