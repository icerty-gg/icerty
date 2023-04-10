import Image from 'next/image'
import Link from 'next/link'

interface Props {
  readonly img: string
  readonly name: string
}

export const CategoryItem = ({ img, name }: Props) => {
  return (
    <li className='border bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl'>
      <Link className={`flex flex-col p-4 items-center gap-6`} href={`/offers?category=${name.toLowerCase()}`}>
        <div className='flex items-center justify-center bg-sky-400/10 rounded-full'>
          <Image className='pointer-events-none rounded-md' width={100} height={100} src={img} alt={name} />
        </div>

        <h3 className='text-white text-center'>{name}</h3>
      </Link>
    </li>
  )
}
