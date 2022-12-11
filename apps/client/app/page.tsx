import { getCategoriesSchema, validateSchema } from 'common'

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
      {categories.map(c => (
        <div key={c.id}>{c.name}</div>
      ))}
      <h1>Kategorie główne</h1>
    </Wrapper>
  )
}

export default Home
