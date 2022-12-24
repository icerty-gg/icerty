import Image from 'next/image'

import { api } from '../../../utils/fetcher'

export const generateStaticParams = async () => {
  const { data: offers } = await api.get('/offers/')

  return offers.map(o => ({
    slug: o.id
  }))
}

interface Props {
  readonly params: { readonly slug: string }
}

const OfferDetails = async ({ params }: Props) => {
  const { slug } = params
  const offer = await api.get('/offers/:id', { params: { id: slug } })

  return (
    <div>
      <h1>{offer.name}</h1>
      <Image width={500} height={500} alt={offer.name} src={offer.name} />
    </div>
  )
}

export default OfferDetails
