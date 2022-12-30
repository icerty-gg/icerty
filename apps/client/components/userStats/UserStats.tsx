'use client'

import { useState } from 'react'

import { Offer } from '../offers/Offer'
import { PrimaryButton } from '../ui/primary-button/PrimaryButton'

export const UserStats = () => {
  const [selectedStatus, setIsSelectedStatus] = useState<'offers' | 'Followed'>('offers')

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1  gap-4 text-white backdrop-blur blur-md'>
      <div className='flex flex-col gap-4'>
        <button
          onClick={() => setIsSelectedStatus('offers')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            selectedStatus === 'offers' ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Twoje ogłoszenia</h4>
        </button>
        <button
          onClick={() => setIsSelectedStatus('Followed')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            selectedStatus === 'Followed' ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Obserwowane ogłoszenia</h4>
        </button>
      </div>

      {selectedStatus === 'offers' && (
        <div className='grid grid-cols-1 gap-4 '>
          {/* <Offer createdAt={'xd'} id={'awd'} image={undefined} name={'awd'} price={0} /> */}
          <PrimaryButton href='/offers'>Zobacz wszystkie</PrimaryButton>
        </div>
      )}

      {selectedStatus === 'Followed' && (
        <div className='grid grid-cols-1 gap-4 '>
          {/* <Offer createdAt={'awdd'} id={'2323'} image={undefined} name={'awd'} price={0} /> */}
          {/* <Offer createdAt={'ddd'} id={'4424'} image={undefined} name={'awdawd'} price={0} /> */}
          <PrimaryButton href='/followed'>Zobacz wszystkie</PrimaryButton>
        </div>
      )}
    </div>
  )
}
