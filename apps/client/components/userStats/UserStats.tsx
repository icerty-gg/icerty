'use client'

import { useState } from 'react'

import { Announcement } from '../announcements/Announcement'
import { PrimaryButton } from '../ui/PrimaryButton'

export const UserStats = () => {
  const [selectedStatus, setIsSelectedStatus] = useState<'announcements' | 'observed'>('announcements')

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1  gap-4 text-white backdrop-blur blur-md'>
      <div className='flex flex-col gap-4'>
        <button
          onClick={() => setIsSelectedStatus('announcements')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            selectedStatus === 'announcements' ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Twoje ogłoszenia</h4>
        </button>
        <button
          onClick={() => setIsSelectedStatus('observed')}
          className={`flex items-center w-full justify-center rounded-2xl p-4 hover:bg-sky-500/10 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${
            selectedStatus === 'observed' ? 'bg-sky-500/10' : 'bg-gray-900/75'
          }`}
        >
          <h4>Obserwowane ogłoszenia</h4>
        </button>
      </div>

      {selectedStatus === 'announcements' && (
        <div className='grid grid-cols-1 gap-4 '>
          <Announcement />
          <PrimaryButton href='/announcements'>Zobacz wszystkie</PrimaryButton>
        </div>
      )}

      {selectedStatus === 'observed' && (
        <div className='grid grid-cols-1 gap-4 '>
          <Announcement />
          <Announcement />
          <PrimaryButton href='/observed'>Zobacz wszystkie</PrimaryButton>
        </div>
      )}
    </div>
  )
}
