import { Type } from '@sinclair/typebox'

import type { Static } from '@sinclair/typebox'

export const ProductSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  categoryName: Type.String(),
  categoryId: Type.String(),
  count: Type.Number(),
  price: Type.Number(),
  priceUnit: Type.Union([Type.Literal('USD'), Type.Literal('PLN'), Type.Literal('GBP'), Type.Literal('EUR')]),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Product = Static<typeof ProductSchema>

export const createProductSchema = {
  body: Type.Object({
    name: Type.String(),
    categoryName: Type.String(),
    count: Type.Optional(Type.Number()),
    price: Type.Number(),
    priceUnit: Type.Optional(
      Type.Union([Type.Literal('USD'), Type.Literal('PLN'), Type.Literal('GBP'), Type.Literal('EUR')])
    )
  }),
  response: {
    201: ProductSchema,
    404: Type.Object({
      message: Type.String(),
      statusCode: Type.Number()
    }),
    500: Type.Unknown()
  }
}
