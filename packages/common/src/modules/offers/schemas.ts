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
    200: Type.Array(OfferSchema)
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
  consumes: ['multipart/form-data'],
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
