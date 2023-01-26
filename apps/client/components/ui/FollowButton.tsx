'use client'

import clsx from 'clsx'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

import { useUser } from '../../hooks/useUser'
import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'

import { LoadingSpinner } from './LoadingSpinner'

interface Props {
  readonly className?: string
  readonly id: string
}

export const FollowButton = ({ className, id }: Props) => {
  const { user } = useUser()

  const { data, refetch } = useQuery({
    queryFn: () => api.get('/api/offers/followed'),
    queryKey: ['followedOffers'],
    select(data) {
      return data.offers.map(o => o.id)
    }
  })

  const isFollowed = data?.includes(id) ?? false

  const { isLoading, mutate: addToList } = useMutation({
    mutationFn: () => api.post('/api/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => {
      notify('Successfully added to list', 'success')
      void refetch()
    },
    onError: () => {
      if (!user) {
        notify('You need to login!', 'error')
        return
      }

      notify('Too many requests', 'error')
    }
  })

  const { isLoading: isSecondLoading, mutate: removeFromList } = useMutation({
    mutationFn: () => api.delete('/api/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => {
      notify('Successfully removed from list', 'success')
      void refetch()
    },
    onError: () => notify('Error', 'error')
  })

  if (isLoading || isSecondLoading)
    return (
      <div
        className={clsx(
          'flex items-center justify-center top-4 right-4 rounded-[50%] p-[0.65rem] text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20 hover:border-sky-500 transition-all',
          className
        )}
      >
        <LoadingSpinner size='w-[18px] h-[18px]' />
      </div>
    )

  return (
    <button
      onClick={() => (isFollowed ? removeFromList() : addToList())}
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
