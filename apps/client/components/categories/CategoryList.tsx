import { CATEGORIES } from '../../constants/categories'

import { CategoryItem } from './CategoryItem'

export const CategoryList = () => {
  return (
    <ul>
      {CATEGORIES.map(c => (
        <CategoryItem image={c.image} name={c.name} key={c.id} />
      ))}
    </ul>
  )
}
