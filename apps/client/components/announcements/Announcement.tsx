import Image from 'next/image'

export const Announcement = () => {
  return (
    <div className='flex items-center gap-4 border bg-gray-800/20 border-slate-800 hover:bg-sky-400/20 p-4 rounded-xl'>
      <Image
        width='100'
        height='100'
        src='https://ireland.apollo.olxcdn.com/v1/files/tce2tlc02s1o1-PL/image;s=1000x700'
        alt='Ogłoszenie'
        className='rounded-md'
      />

      <div className='text-white'>
        <p className='text-xs'>Dodane dzisiaj o 19:24</p>
        <h3>Sprzedam e46 330ci h/k 19" full opcja</h3>
        <p className='text-sky-500'>37 500 zł</p>
      </div>
    </div>
  )
}
