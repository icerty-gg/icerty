import { Type } from '@sinclair/typebox'

const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3 }),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export const getCategoriesSchema = {
  response: {
    200: Type.Object({
      categories: Type.Array(CategorySchema)
    })
  }
}

export const createCategorySchema = {
  body: Type.Pick(CategorySchema, ['name']),
  response: {
    201: CategorySchema
  }
}

export const deleteCategorySchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema
  }
}
export const editCategorySchema = {
  body: Type.Pick(CategorySchema, ['name']),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema
  }
}
