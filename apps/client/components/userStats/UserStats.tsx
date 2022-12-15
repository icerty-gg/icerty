'use client'

import { useState } from 'react'

import { Announcement } from '../announcements/Announcement'
import { PrimaryButton } from '../ui/PrimaryButton'

export const UserStats = () => {
  const [isSelected, setIsSelected] = useState('announcements')

  const a = isSelected === 'announcements'
  const o = isSelected === 'observed'

  return (
    <div className='grid grid-cols-2 gap-4 text-white backdrop-blur blur-md'>
      <div className='flex flex-col gap-4'>
        <button
          onClick={() => setIsSelected('announcements')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            a ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Twoje ogłoszenia</h4>
        </button>
        <button
          onClick={() => setIsSelected('observed')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            o ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Obserwowane ogłoszenia</h4>
        </button>
      </div>

      {a && (
        <div className='grid grid-cols-1 gap-4 '>
          <Announcement />
          <PrimaryButton title='Zobacz wszystkie' href='/announcements' />
        </div>
      )}

      {o && (
        <div className='grid grid-cols-1 gap-4 '>
          <Announcement />
          <Announcement />
          <PrimaryButton title='Zobacz wszystkie' href='/observed' />
        </div>
      )}
    </div>
  )
}
