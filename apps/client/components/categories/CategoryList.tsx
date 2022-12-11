import { getCategoriesSchema, validateSchema } from 'common'

import { api } from '../../constants/api'

import type { Static } from '@sinclair/typebox'

const getCategories = async () => {
  const schema = getCategoriesSchema['response'][200]

  const categories = await api('categories').json<Static<typeof schema>>()

  validateSchema(schema, categories)

  return categories
}

export const CategoryList = async () => {
  const categories = await getCategories()
  console.log(categories)

  return (
    <ul>
      {/* {categories.map((c, i) => (
        <CategoryItem image={c.name} name={c.name} key={i} />
      ))} */}
    </ul>
  )
}
