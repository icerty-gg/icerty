import { Announcement } from '../../components/announcements/Announcement'
import { Filter } from '../../components/filter/Filter'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Wrapper } from '../../components/ui/Wrapper'
// import { api } from '../../utils/fetcher'

const Announcements = () => {
  // const { data: offers } = await api.get('/offers/')

  return (
    <Wrapper>
      <div className='relative'>
        <div className='grid grid-rows-none max-lg:grid-cols-1 grid-cols-[1fr,_2fr] gap-4'>
          {/* @ts-expect-error */}
          <Filter />

          <Container>
            <div className='flex items-center justify-center gap-4 pb-6'>
              <Heading title='Ogłoszenia' />
            </div>

            <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur'>
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
            </ul>
          </Container>

          {/* <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={() => console.log(2)}
            pageRangeDisplayed={5}
            pageCount={10}
            previousLabel='< previous'
            renderOnZeroPageCount={() => console.log(1)}
          /> */}
        </div>
      </div>
    </Wrapper>
  )
}

export default Announcements
