import { Filter } from '../../components/filter/Filter'
import { Offer } from '../../components/offers/Offer'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { api } from '../../utils/fetcher'

const Offers = async () => {
  const { data: offers } = await api.get('/offers/')

  return (
    <Layout>
      <div className='grid grid-rows-none max-lg:grid-cols-1 grid-cols-[1fr,_2fr] gap-4'>
        {/* @ts-expect-error */}
        <Filter />

        <Container>
          <div className='flex items-center justify-center gap-4 pb-6'>
            <Heading title='Offers' />
          </div>

          <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur'>
            {offers.map(o => {
              return <Offer key={o.id} image={o.images[0].img} {...o} />
            })}
          </ul>
        </Container>
      </div>
    </Layout>
  )
}

export default Offers
