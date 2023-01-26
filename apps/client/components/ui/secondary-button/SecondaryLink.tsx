import clsx from 'clsx'
import Link from 'next/link'

import type { ReactNode } from 'react'

interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly href: string
}

export const SecondaryLink = ({ children, className, href }: Props) => {
  return (
    <Link
      className={clsx(
        'text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-10 py-[0.6rem] rounded-full text-center text-sm',
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
