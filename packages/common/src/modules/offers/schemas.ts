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
  body: Type.Optional(Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId'])),
  response: {
    201: OfferSchema
  }
}
export const updateOffersImagesSchema = {
  params: Type.Object({
    id: Type.String()
  })
}

export const deleteOfferSchema = {
  params: Type.Object({
    id: Type.String()
  })
}

export const updateOfferSchema = {
  body: Type.Optional(Type.Pick(OfferSchema, ['name', 'description', 'count', 'price', 'categoryId'])),
  params: Type.Object({
    id: Type.String()
  })
}
