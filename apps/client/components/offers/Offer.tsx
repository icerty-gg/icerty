import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly createdAt: string
  readonly id: string
  readonly image: any
  readonly isPromoted: boolean
  readonly name: string
  readonly price: number
}

export const Offer = ({ createdAt, id, image, isPromoted, name, price }: Props) => {
  const date = new Date(createdAt)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  return (
    <Link href={`/offers/${id}`}>
      <li className='flex items-center gap-4 border bg-gray-800/20 border-slate-800 hover:bg-sky-400/20 p-4 rounded-xl'>
        <Image width={130} height={130} src={image} alt={name} className='rounded-md max-md:w-[70px]' />

        <div className='text-white flex flex-col gap-2'>
          <p className='text-xs'>Added at {date.toLocaleDateString('us-US', options)}</p>
          <h3 className='line-clamp-none md:line-clamp-2'>{name}</h3>
          <p className='text-sky-500 text-xl font-bold'>{price} USD</p>
        </div>

        {isPromoted && (
          <h3 className='absolute -top-2 -right-2 py-2 px-4 bg-sky-500 rounded-full text-white text-sm max-lg:text-xs text-center'>
            Promoted offer
          </h3>
        )}
      </li>
    </Link>
  )
}
