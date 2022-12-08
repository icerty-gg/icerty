import Link from 'next/link'

interface Props {
  readonly href: string
  readonly title: string
}

export const PrimaryButton = ({ href, title }: Props) => {
  return (
    <Link
      className='text-white border-transparent bg-sky-500  hover:bg-sky-400 px-6 py-2 rounded-full transition-all'
      href={href}
    >
      {title}
    </Link>
  )
}
