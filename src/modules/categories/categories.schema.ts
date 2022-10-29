import { Type } from '@sinclair/typebox'

const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
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
  body: Type.Object({
    name: Type.String()
  }),
  response: {
    201: CategorySchema
  }
}

export const deleteCategorySchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema,
  }
}
export const editCategorySchema = {
  body: Type.Object({
    name: Type.String()
  }),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema
  }
}
