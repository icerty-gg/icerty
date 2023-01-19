'use client'

import { useQuery, useMutation } from 'react-query'

import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'

const Lists = () => {
  const {
    data: offers,
    isError,
    isLoading
  } = useQuery({ queryKey: ['followedOffers'], queryFn: () => api.get('/offers/followed'), staleTime: 0 })

  const { mutate: removeFromList } = useMutation({
    mutationKey: ['followedOffers'],
    mutationFn: (id: string) => api.delete('/offers/follow/:id', undefined, { params: { id: id } }),
    onSuccess: () => notify('Removed from list', 'success'),
    onError: () => notify('Error', 'error')
  })

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <h1 className='text-3xl text-left'>Lists</h1>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading...</p>}

      <ul>
        {offers?.offers.map(o => (
          <li key={o.id}>
            {o.name} <button onClick={() => removeFromList(o.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lists
