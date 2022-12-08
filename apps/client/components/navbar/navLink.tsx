import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  readonly href: string
  readonly title: string
}

export const NavLink = ({ href, title }: Props) => {
  const pathname = usePathname()

  return (
    <Link className='hover:text-sky-500 text-slate-200 relative   last-of-type:border-transparent' href={href}>
      {title}
      {pathname === href && (
        <motion.span layoutId='rect' className='absolute w-full h-1 -bottom-2 left-0 bg-sky-500 rounded-full' />
      )}
    </Link>
  )
}
