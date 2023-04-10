'use client'

import { useRouter } from 'next/navigation'
import { BiArrowBack } from 'react-icons/bi'

import { SecondaryButton } from './secondary-button/SecondaryButton'

export const GetBackButton = () => {
  const router = useRouter()

  return (
    <SecondaryButton className='absolute left-4 top-4 flex items-center justify-center' onClick={() => router.back()}>
      <BiArrowBack className='text-xl' />
    </SecondaryButton>
  )
}
