import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly href: string
  readonly image: string
  readonly name: string
}

export const CategoryItem = ({ href, image, name }: Props) => {
  return (
    <li className='border bg-gray-800/20 border-slate-800 hover:bg-sky-400/20 rounded-xl'>
      <Link className='flex flex-col items-center gap-6 p-4' href={href}>
        <div className='flex items-center justify-center bg-sky-400/10 rounded-full'>
          <Image className='pointer-events-none' width={80} height={80} src={image} alt={name} />
        </div>

        <h3 className='text-white text-center'>{name}</h3>
      </Link>
    </li>
  )
}
