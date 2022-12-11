import ky from 'ky-universal'

import { api } from '../../constants/api'

import { CategoryItem } from './CategoryItem'

export const CategoryList = () => {
  const getCategories = async () => {
    return await ky('categories').json<readonly any[]>()
  }
  const categories = getCategories()
  console.log(categories)

  return (
    <ul>
      {/* {categories.map((c, i) => (
        <CategoryItem image={c.name} name={c.name} key={i} />
      ))} */}
      <h1>esa</h1>
    </ul>
  )
}
