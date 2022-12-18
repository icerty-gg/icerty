import { Type, Kind } from '@sinclair/typebox'
import { Custom } from '@sinclair/typebox/custom'

import { CategorySchema } from '../categories/categories.schemas'
import { UserSchema } from '../users/users.schemas'

import type { Static } from '@sinclair/typebox'

export const OfferSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  categoryId: Type.String(),
  userId: Type.String(),
  count: Type.Number(),
  price: Type.Number(),
  isPromoted: Type.Boolean(),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Offer = Static<typeof OfferSchema>

export const getAllOffersSchema = {
  tags: ['offers'],
  summary: 'Get all offers',
  response: {
    200: Type.Object({
      data: Type.Array(
        Type.Intersect([
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
    Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId']),
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
  body: Type.Optional(Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId', 'isPromoted'])),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Null()
  }
}
