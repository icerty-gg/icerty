import { Type } from '@sinclair/typebox'

import { BufferType, StringEnum } from '../../utils/schema.js'
import { CategorySchema } from '../categories/categories.schemas.js'
import { UserSchema } from '../users/users.schemas.js'

import type { FastifySchema } from 'fastify'

export const OfferSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 8, maxLength: 50 }),
  description: Type.String({ minLength: 50, maxLength: 1500 }),
  categoryId: Type.String(),
  userId: Type.String(),
  count: Type.Number({ minimum: 1 }),
  price: Type.Number({ minimum: 1 }),
  isPromoted: Type.Boolean(),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  city: Type.String({ minLength: 3, maxLength: 50 }),
  condition: StringEnum(['new', 'used']),
  images: Type.Array(
    Type.Object({
      id: Type.String(),
      img: Type.String()
    })
  )
})

export const getAllOffersSchema = {
  tags: ['offers'],
  summary: 'Get all offers',
  querystring: Type.Object({
    take: Type.Number({ minimum: 1, default: 20, maximum: 50 }),
    city: Type.Optional(Type.String({ minLength: 1 })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    page: Type.Number({ minimum: 1, default: 1 }),
    price_from: Type.Optional(Type.Number({ minimum: 1 })),
    price_to: Type.Optional(Type.Number({ minimum: 1 })),
    count_from: Type.Optional(Type.Number({ minimum: 1 })),
    count_to: Type.Optional(Type.Number({ minimum: 1 })),
    promoted: Type.Optional(Type.Boolean()),
    followed: Type.Optional(Type.Boolean()),
    category: Type.Optional(Type.String({ minLength: 1 })),
    order_direction: StringEnum(['asc', 'desc'], 'asc'),
    order_by: StringEnum(['price', 'createdAt'], 'createdAt')
  }),
  response: {
    200: Type.Object({
      maxPage: Type.Number({ minimum: 0 }),
      offers: Type.Array(
        Type.Intersect([
          Type.Omit(OfferSchema, ['userId', 'categoryId', 'images']),
          Type.Object({ image: Type.String() }),
          Type.Object({
            user: Type.Pick(UserSchema, ['name', 'surname', 'img']),
            isFollowed: Type.Boolean()
          }),
          Type.Object({ categoryName: CategorySchema.properties.name })
        ])
      ),
      count: Type.Number({ minimum: 0 })
    })
  }
} satisfies FastifySchema

export const getOfferSchema = {
  tags: ['offers'],
  summary: 'Get offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Intersect([
      Type.Omit(OfferSchema, ['userId', 'categoryId']),
      Type.Object({
        user: Type.Pick(UserSchema, ['name', 'surname', 'img', 'email', 'createdAt']),
        category: Type.Pick(CategorySchema, ['name', 'img']),
        isFollowed: Type.Boolean()
      })
    ])
  }
} satisfies FastifySchema

export const createOfferSchema = {
  tags: ['offers'],
  summary: 'Create offer',
  consumes: ['multipart/form-data'],
  body: Type.Intersect([
    Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId', 'city', 'condition']),
    Type.Object({
      images: Type.Array(
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

export const deleteOfferSchema = {
  tags: ['offers'],
  summary: 'Delete offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema

export const updateOfferSchema = {
  tags: ['offers'],
  summary: 'Update offer by id',
  body: Type.Optional(
    Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId', 'isPromoted', 'city', 'condition'])
  ),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema

export const followOfferSchema = {
  tags: ['offers'],
  summary: 'Follow offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema

export const unfollowOfferSchema = {
  tags: ['offers'],
  summary: 'Unfollow offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Void()
  }
} satisfies FastifySchema
