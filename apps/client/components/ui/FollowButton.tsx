'use client'

import clsx from 'clsx'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { useToggle } from '../../hooks/useToggle'
// import { api } from '../../utils/fetcher'

interface Props {
  readonly className?: string
  readonly id: string
  readonly isFollowed: boolean
}

export const FollowButton = ({ className, id, isFollowed }: Props) => {
  console.log(isFollowed, id)
  const [isToggled, setIsToggleToggled] = useToggle()

  const addToFollowingHandler = () => {
    // await api.post('/offers/follow/:id', undefined, { params: { id: id } })
    setIsToggleToggled()
  }

  return (
    <button
      onClick={addToFollowingHandler}
      className={clsx(
        'flex items-center justify-center rounded-full p-[0.65rem] text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20 hover:border-sky-500 transition-all',
        isToggled && 'bg-sky-400/20',
        className
      )}
    >
      {isToggled ? <AiFillHeart className='text-lg' /> : <AiOutlineHeart className='text-lg' />}
    </button>
  )
}
