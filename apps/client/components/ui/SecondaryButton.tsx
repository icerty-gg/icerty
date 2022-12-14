import Link from 'next/link'

interface Props {
  readonly className?: string,
  readonly href: string,
  readonly title: string
}

export const SecondaryButton = ({ className, href, title }: Props) => {
  return (
    <Link
      className={`text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-6 py-2 rounded-full text-center text-sm ${className}`}
      href={href}
    >
      {title}
    </Link>
  )
}
