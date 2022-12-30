import { Type } from '@sinclair/typebox'

import { BufferType, StringEnum } from '../../utils/schema'
import { CategorySchema } from '../categories/categories.schemas'
import { UserSchema } from '../users/users.schemas'

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
    city: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    page: Type.Number({ minimum: 1, default: 1 }),
    price_from: Type.Optional(Type.Number({ minimum: 1 })),
    price_to: Type.Optional(Type.Number({ minimum: 1 })),
    count_from: Type.Optional(Type.Number({ minimum: 1 })),
    count_to: Type.Optional(Type.Number({ minimum: 1 })),
    category: Type.Optional(Type.String()),
    order_direction: StringEnum(['asc', 'desc'], 'asc'),
    order_by: StringEnum(['price', 'createdAt'], 'createdAt')
  }),
  response: {
    200: Type.Object({
      maxPage: Type.Number({ minimum: 0 }),
      data: Type.Array(
        Type.Intersect([
          OfferSchema,
          Type.Object({
            user: Type.Pick(UserSchema, ['id', 'name', 'surname', 'img']),
            category: Type.Pick(CategorySchema, ['id', 'name', 'img'])
          })
        ])
      )
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
    200: Type.Object({
      offer: OfferSchema,
      user: Type.Pick(UserSchema, ['id', 'name', 'surname', 'img', 'createdAt'])
    })
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

export const getMyFollowedOffersSchema = {
  tags: ['offers'],
  summary: 'Get my followed offers',
  response: {
    200: Type.Object({
      data: Type.Array(OfferSchema)
    })
  }
} satisfies FastifySchema
