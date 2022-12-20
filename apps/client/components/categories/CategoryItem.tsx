import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly href: string
  readonly image: string
  readonly isSmall?: boolean
  readonly name: string
}

export const CategoryItem = ({ href, image, isSmall, name }: Props) => {
  return (
    <li className='border bg-gray-800/20 border-slate-800 hover:bg-sky-400/20 rounded-xl'>
      <Link
        className={`flex ${isSmall ? 'flex-row p-2' : 'flex-col p-4'} items-center gap-6`}
        href={`announcements/${href.toLowerCase()}`}
      >
        <div className='flex items-center justify-center bg-sky-400/10 rounded-full'>
          <Image className='pointer-events-none' width={isSmall ? 60 : 80} height={isSmall ? 60 : 80} src={image} alt={name} />
        </div>

        <h3 className='text-white text-center'>{name}</h3>
      </Link>
    </li>
  )
}
