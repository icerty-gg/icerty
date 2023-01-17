import { api } from '../../../utils/fetcher'
import { DefaultTags } from '../../defaultTags'

const Head = async ({ params }: { readonly params: { readonly id: string } }) => {
  const offer = await api.get('/offers/:id', { params })

  return (
    <>
      <title key='title'>{offer.name}</title>
      <DefaultTags />
    </>
  )
}

export default Head
