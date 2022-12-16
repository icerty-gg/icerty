import { CategorySchema } from './../categories/schemas'
import { UserSchema } from './../users/schemas'
import { Static, Type } from '@sinclair/typebox'

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
  response: {
    200: Type.Array(
      Type.Intersect([
        OfferSchema,
        Type.Object({
          user: UserSchema,
          offerImage: Type.Array(
            Type.Object({
              id: Type.String(),
              img: Type.String()
            })
          ),
          category: CategorySchema
        })
      ])
    )
  }
}

export const getOfferSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: OfferSchema
  }
}

export const createOfferSchema = {
  body: Type.Intersect([
    Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId']),
    Type.Object({
      images: Type.Array(
        Type.Object({
          data: Type.Any(),
          filename: Type.String(),
          encoding: Type.String(),
          mimetype: Type.String(),
          limit: Type.Boolean()
        })
      )
    })
  ]),
  response: {
    201: OfferSchema
  }
}

export const deleteOfferSchema = {
  params: Type.Object({
    id: Type.String()
  })
}

export const updateOfferSchema = {
  body: Type.Optional(Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId', 'isPromoted'])),
  params: Type.Object({
    id: Type.String()
  })
}
