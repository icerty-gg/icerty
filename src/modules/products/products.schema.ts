import { Type } from '@sinclair/typebox'

// import type { TypeBoxFastifySchema } from '../../types'
import type { Static } from '@sinclair/typebox'

enum PriceU {
  EUR = 'EUR',
  GBP = 'GBP',
  PLN = 'PLN',
  USD = 'USD'
}

export const ProductSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  categoryName: Type.String(),
  categoryId: Type.String(),
  count: Type.Number(),
  price: Type.Number(),
  priceUnit: Type.Enum(PriceU),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Product = Static<typeof ProductSchema>

export const createProductSchema = {
  body: Type.Object({
    name: Type.String(),
    categoryName: Type.String(),
    categoryId: Type.String(),
    count: Type.Number(),
    price: Type.Number(),
    priceUnit: Type.Enum(PriceU)
  }),
  response: {
    201: ProductSchema
  }
}
