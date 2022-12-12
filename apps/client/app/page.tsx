import { getCategoriesSchema, validateSchema } from 'common'

import { CategoryItem } from '../components/categories/CategoryItem'
import { Wrapper } from '../components/ui/Wrapper'
import { api } from '../constants/api'

const getCategories = async () => {
  const schema = getCategoriesSchema['response'][200]

  const { data } = await api.get('/categories')

  const { categories } = validateSchema(schema, data)

  return categories
}

const Home = async () => {
  const categories = await getCategories()

  return (
    <Wrapper>
      <h1>Kategorie główne</h1>
      <ul>
        {categories.map(c => (
          <CategoryItem key={c.id} name={c.name} image={c.img} />
        ))}
      </ul>
    </Wrapper>
  )
}

export default Home
