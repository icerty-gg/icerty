import { getCategoriesSchema, validateSchema } from 'common'

import { Wrapper } from '../components/ui/Wrapper'
import { api } from '../constants/api'

import type { Static } from '@sinclair/typebox'

const getCategories = async () => {
  const schema = getCategoriesSchema['response'][200]

  const categories = await api('categories').json<Static<typeof schema>>()

  validateSchema(schema, categories)

  return categories
}

const Home = async () => {
  const categories = await getCategories()

  return (
    <Wrapper>
      <h1>Kategorie główne</h1>
    </Wrapper>
  )
}

export default Home
