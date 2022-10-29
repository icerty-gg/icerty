import { Type } from '@sinclair/typebox'

const ProductSchema = Type.Object({
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

export const getProductsSchema = {
  response: {
    200: Type.Object({ products: Type.Array(ProductSchema) }),
    500: Type.Object({
      message: Type.String()
    })
  }
}

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
  body: Type.Object({
    name: Type.Optional(Type.String()),
    categoryName: Type.Optional(Type.String()),
    count: Type.Optional(Type.Number()),
    price: Type.Optional(Type.Number()),
    priceUnit: Type.Optional(
      Type.Union([Type.Literal('USD'), Type.Literal('PLN'), Type.Literal('GBP'), Type.Literal('EUR')])
    )
  }),
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: ProductSchema
  }
}
