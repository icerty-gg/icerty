'use client'

import clsx from 'clsx'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'

interface Props {
  readonly className?: string
  readonly id: string
}

export const FollowButton = ({ className, id }: Props) => {
  const { data, refetch } = useQuery({
    queryFn: () => api.get('/offers/followed'),
    queryKey: ['followedOffers'],
    select(data) {
      return data.offers.map(o => o.id)
    }
  })

  const isFollowed = data?.includes(id) ?? false

  const { mutate: addToList } = useMutation({
    mutationFn: () => api.post('/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => {
      notify('Successfully added to list', 'success')
      void refetch()
    },
    onError: () => notify('Error', 'error')
  })

  const { mutate: removeFromList } = useMutation({
    mutationFn: () => api.delete('/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => {
      notify('Successfully removed from list', 'success')
      void refetch()
    },
    onError: () => notify('Error', 'error')
  })

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
