import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly createdAt?: string
  readonly id?: string
  readonly image?: any
  readonly name?: string
  readonly price?: number
}

export const Announcement = ({ createdAt, id, image, name, price }: Props) => {
  return (
    <Link href={`/announcements/${id}`}>
      <li className='flex items-center gap-4 border bg-gray-800/20 border-slate-800 hover:bg-sky-400/20 p-4 rounded-xl'>
        <Image width='100' height='100' src={image} alt={'xd'} className='rounded-md max-md:w-[70px]' />

        <div className='text-white flex flex-col gap-2'>
          <p className='text-xs'>Dodane {createdAt}</p>
          <h3 className='line-clamp-none md:line-clamp-2'>{name}</h3>
          <p className='text-sky-500 text-xl font-bold'>{price} zł</p>
        </div>
      </li>
    </Link>
  )
}
