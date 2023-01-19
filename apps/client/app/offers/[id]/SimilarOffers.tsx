'use client'

// import { useSearchParams } from 'next/navigation'
import { Offer } from '../../../components/offers/Offer'
import { PrimaryButton } from '../../../components/ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/secondary-button/SecondaryButton'
import { useOffers } from '../../../hooks/useOffers'

export const SimilarOffers = ({ category }: { readonly category: string }) => {
  // const takeOffersParams = useSearchParams()
  const { isError, isLoading, offers } = useOffers()

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>An error occured</p>

  const filtered = offers?.offers.filter(o => o.category.name === category)

  return (
    <ul className='grid grid-cols-1 gap-4'>
      {filtered?.map(o => {
        return <Offer key={o.id} image={o.images[0]?.img} {...o} />
      })}
      <PrimaryButton>Show more</PrimaryButton>
      <SecondaryButton href='/offers'>All offers</SecondaryButton>
    </ul>
  )
}
