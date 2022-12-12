import { getCategoriesSchema, validateSchema } from 'common'

import { api } from '../../constants/api'

import { CategoryItem } from './CategoryItem'

const getCategories = async () => {
  const schema = getCategoriesSchema['response'][200]

  const { data } = await api.get('/categories')

  const { categories } = validateSchema(schema, data)

  return categories
}

export const CategoryList = async () => {
  const categories = await getCategories()

  return (
    <ul>
      {categories.map(c => (
        <CategoryItem key={c.id} name={c.name} image={c.img} />
      ))}
    </ul>
  )
}
