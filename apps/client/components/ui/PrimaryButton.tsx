import Link from 'next/link'

interface Props {
  readonly children: string
  readonly href: string
}

export const PrimaryButton = ({ children, href }: Props) => {
  return (
    <Link
      className='shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500 text-white border-transparent bg-sky-500  hover:bg-sky-400 px-6 py-2 rounded-full transition-all text-center'
      href={href}
    >
      {children}
    </Link>
  )
}
