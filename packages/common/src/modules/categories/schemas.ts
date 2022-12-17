import { Static, Type } from '@sinclair/typebox'

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3 }),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  img: Type.String()
})

export type Category = Static<typeof CategorySchema>

export const getCategoriesSchema = {
  tags: ['categories'],
  summary: 'Get all categories',
  response: {
    200: Type.Object({
      categories: Type.Array(CategorySchema)
    })
  }
}

export const createCategorySchema = {
  tags: ['categories'],
  summary: 'Create category',
  body: Type.Pick(CategorySchema, ['name', 'img']),
  response: {
    201: CategorySchema
  }
}

export const deleteCategorySchema = {
  tags: ['categories'],
  summary: 'Delete category by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema
  }
}

export const updateCategorySchema = {
  tags: ['categories'],
  summary: 'Update category by id',
  body: Type.Optional(Type.Pick(CategorySchema, ['name', 'img'])),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema
  }
}
