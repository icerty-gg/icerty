import { Type } from '@sinclair/typebox'

import { BufferType } from '../../utils/schema'

import type { FastifySchema } from 'fastify'

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3 }),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  img: Type.String()
})

export const getCategoriesSchema = {
  tags: ['categories'],
  summary: 'Get all categories',
  response: {
    200: Type.Object({
      data: Type.Array(CategorySchema)
    })
  }
} satisfies FastifySchema

export const createCategorySchema = {
  tags: ['categories'],
  summary: 'Create category',
  consumes: ['multipart/form-data'],
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
    204: Type.Void()
  }
} satisfies FastifySchema

export const deleteCategorySchema = {
  tags: ['categories'],
  summary: 'Delete category by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema

export const updateCategorySchema = {
  tags: ['categories'],
  summary: 'Update category by id',
  body: Type.Optional(Type.Pick(CategorySchema, ['name', 'img'])),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema
