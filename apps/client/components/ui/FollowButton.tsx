'use client'

import clsx from 'clsx'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useMutation } from 'react-query'

import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'

interface Props {
  readonly className?: string
  readonly id: string
  readonly isFollowed: boolean
}

export const FollowButton = ({ className, id, isFollowed }: Props) => {
  const { isLoading, mutate: addToList } = useMutation({
    mutationFn: () => api.post('/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => {
      notify('Successfully added to lists', 'success')
    },
    onError: () => notify('Error', 'error')
  })

  if (isLoading) return <p className='text-white'>...</p>

  return (
    <button
      onClick={() => addToList()}
      className={clsx(
        'flex items-center justify-center rounded-full p-[0.65rem] text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20 hover:border-sky-500 transition-all',
        isFollowed && 'bg-sky-400/20',
        className
      )}
    >
      {isFollowed ? <AiFillHeart className='text-lg' /> : <AiOutlineHeart className='text-lg' />}
    </button>
  )
}
