import { Type } from '@sinclair/typebox'

import { BufferType } from '../../utils/schema'

import type { Static } from '@sinclair/typebox'

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
      data: Type.Array(CategorySchema)
    })
  }
}

export const createCategorySchema = {
  tags: ['categories'],
  summary: 'Create category',
  body: Type.Intersect([
    Type.Pick(CategorySchema, ['name']),
    Type.Object({
      img: Type.Array(
        Type.Object({
          data: BufferType,
          filename: Type.String(),
          encoding: Type.String(),
          mimetype: Type.String(),
          limit: Type.Boolean()
        })
      )
    })
  ]),
  response: {
    204: Type.Null()
  }
}

export const deleteCategorySchema = {
  tags: ['categories'],
  summary: 'Delete category by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Null()
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
    204: Type.Null()
  }
}
