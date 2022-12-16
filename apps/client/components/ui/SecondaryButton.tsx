import { clsx } from 'clsx'
import Link from 'next/link'

interface Props {
  readonly children: string
  readonly className?: string
  readonly href: string
}

export const SecondaryButton = ({ children, className, href }: Props) => {
  return (
    <Link
      className={`text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-6 py-2 rounded-full text-center text-sm ${clsx(
        className && className
      )}`}
      href={href}
    >
      {children}
    </Link>
  )
}
