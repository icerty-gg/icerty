import { CategoryList } from '../components/categories/CategoryList'
import { Wrapper } from '../components/ui/Wrapper'

const Home = () => {
  return (
    <Wrapper>
      <h1>Kategorie główne</h1>
      <CategoryList />
    </Wrapper>
  )
}

export default Home
