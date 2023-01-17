import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly id: string
  readonly img: string
  readonly isSmall?: boolean
  readonly name: string
}

export const CategoryItem = ({ id, img, isSmall, name }: Props) => {
  return (
    <li className='border bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl'>
      <Link
        className={`flex ${isSmall ? 'flex-row p-2' : 'flex-col p-4'} items-center gap-6`}
        href={`categories/${id}`}
      >
        <div className='flex items-center justify-center bg-sky-400/10 rounded-full'>
          <Image
            className='pointer-events-none rounded-md'
            width={isSmall ? 80 : 100}
            height={isSmall ? 80 : 100}
            src={img}
            alt={name}
          />
        </div>

        <h3 className='text-white text-center'>{name}</h3>
      </Link>
    </li>
  )
}
