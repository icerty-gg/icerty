import { Type, Kind } from '@sinclair/typebox'
import { Custom } from '@sinclair/typebox/custom'

import { StringEnum } from '../../utils/schema'
import { CategorySchema } from '../categories/categories.schemas'
import { UserSchema } from '../users/users.schemas'

import type { Static } from '@sinclair/typebox'

export const OfferSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 8, maxLength: 50 }),
  description: Type.String({ minLength: 50, maxLength: 1500 }),
  categoryId: Type.String(),
  userId: Type.String(),
  count: Type.Number({ minimum: 1 }),
  price: Type.Number({ minimum: 0 }),
  isPromoted: Type.Boolean(),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  city: Type.String({ minLength: 3, maxLength: 50 }),
  condition: StringEnum(['new', 'used'])
})

export type Offer = Static<typeof OfferSchema>

export const getAllOffersSchema = {
  tags: ['offers'],
  summary: 'Get all offers',
  querystring: Type.Object({
    city: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    page: Type.Optional(Type.Number({ minimum: 1 })),
    order_direction: Type.Optional(StringEnum(['asc', 'desc'])),
    order_by: Type.Optional(StringEnum(['price', 'createdAt']))
  }),
  response: {
    200: Type.Object({
      maxPage: Type.Number({ minimum: 1 }),
      data: Type.Array(
        Type.Intersect([
          OfferSchema,
          Type.Object({
            user: Type.Pick(UserSchema, ['id', 'name', 'surname', 'img']),
            images: Type.Array(
              Type.Object({
                id: Type.String(),
                img: Type.String()
              })
            ),
            category: Type.Pick(CategorySchema, ['id', 'name', 'img'])
          })
        ])
      )
    })
  }
}

export const getOfferSchema = {
  tags: ['offers'],
  summary: 'Get offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: OfferSchema
  }
}

Custom.Set('buffer', (schema, value) => value instanceof Buffer)

const BufferType = Type.Unsafe<Buffer>({ [Kind]: 'buffer' })

export const createOfferSchema = {
  tags: ['offers'],
  summary: 'Create offer',
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
    201: Type.Intersect([
      OfferSchema,
      Type.Object({
        user: UserSchema,
        images: Type.Array(
          Type.Object({
            id: Type.String(),
            img: Type.String()
          })
        ),
        category: CategorySchema
      })
    ])
  }
}

export const deleteOfferSchema = {
  tags: ['offers'],
  summary: 'Delete offer by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Null()
  }
}

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
    204: Type.Null()
  }
}
