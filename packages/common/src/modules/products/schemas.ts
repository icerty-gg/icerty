import { Static, Type } from '@sinclair/typebox'

export const ProductSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  categoryName: Type.String(),
  categoryId: Type.String(),
  count: Type.Number(),
  price: Type.Number(),
  priceUnit: Type.Union([Type.Literal('USD'), Type.Literal('PLN'), Type.Literal('GBP'), Type.Literal('EUR')]),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Product = Static<typeof ProductSchema>

export const getProductsSchema = {
  response: {
    200: Type.Object({ products: Type.Array(ProductSchema) })
  }
}

export const createProductSchema = {
  body: Type.Omit(ProductSchema, ['id', 'categoryName', 'updatedAt', 'createdAt']),
  response: {
    201: ProductSchema
  }
}

export const deleteProductSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: ProductSchema
  }
}

export const editProductSchema = {
  body: Type.Optional(Type.Omit(ProductSchema, ['id', 'categoryId', 'categoryName', 'updatedAt', 'createdAt'])),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: ProductSchema
  }
}
