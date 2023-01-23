import Image from 'next/image'

import emptyContentImage from '../../img/empty.png'

export const EmptyContent = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <Image src={emptyContentImage} alt='empty lists' width={250} height={250} />
      <p className='text-white text-lg text-center'>Nothing here</p>
    </div>
  )
}
