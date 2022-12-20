import { clsx } from 'clsx'
import Link from 'next/link'
interface Props {
  readonly children: string
  readonly className?: string
  readonly href: string
}

export const PrimaryButton = ({ children, className, href }: Props) => {
  return (
    <Link
      className={clsx(
        'shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500 text-white border-transparent bg-sky-500  hover:bg-sky-400 px-6 py-2 rounded-full transition-all text-center',
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
