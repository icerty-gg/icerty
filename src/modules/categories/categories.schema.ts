import { Type } from '@sinclair/typebox'

import type { Static } from '@sinclair/typebox'

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Category = Static<typeof CategorySchema>

export const getCategoriesSchema = {
  response: {
    200: Type.Object({
      categories: Type.Array(CategorySchema)
    }),
    '4xx': Type.Object({
      message: Type.String()
    }),
    500: Type.Object({
      message: Type.String()
    })
  }
}

export const createCategorySchema = {
  body: Type.Object({
    name: Type.String()
  }),
  response: {
    201: CategorySchema,
    '4xx': Type.Object({
      message: Type.String()
    }),
    500: Type.Object({
      message: Type.String()
    })
  }
}

export const deleteCategorySchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: CategorySchema,
    '4xx': Type.Object({
      message: Type.String()
    }),
    500: Type.Object({
      message: Type.String()
    })
  }
}
