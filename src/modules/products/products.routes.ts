import { isAuth } from '../../hooks/IsAuth'
import { prisma } from '../../utils/prisma'

import { createProductSchema, deleteProductSchema, editProductSchema, getProductsSchema } from './products.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const productsRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/', { schema: getProductsSchema, preValidation: isAuth(['USER', 'ADMIN']) }, async (request, reply) => {
      const products = await prisma.product.findMany()

      return reply.code(200).send({
        products: products.map(p => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        }))
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createProductSchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
      const { categoryName, count, name, price, priceUnit } = request.body

      const foundCategory = await prisma.category.findFirst({
        where: {
          name: categoryName
        }
      })

      if (!foundCategory) {
        throw reply.notFound('Category not found!')
      }

      const product = await prisma.product.create({
        data: { count, name, price, priceUnit, categoryId: foundCategory.id, categoryName: foundCategory.name }
      })

      return reply
        .code(201)
        .send({ ...product, updatedAt: product.updatedAt.toISOString(), createdAt: product.createdAt.toISOString() })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteProductSchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
      const { id } = request.params
      const product = await prisma.product.findFirst({
        where: {
          id
        }
      })

      if (!product) {
        throw reply.notFound('Product not found!')
      }

      const deletedProduct = await prisma.product.delete({
        where: {
          id
        }
      })

      return reply.code(200).send({
        ...deletedProduct,
        updatedAt: deletedProduct.updatedAt.toISOString(),
        createdAt: deletedProduct.createdAt.toISOString()
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: editProductSchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
      const { id } = request.params
      const { categoryName, count, name, price, priceUnit } = request.body

      const product = await prisma.product.findFirst({
        where: {
          id
        }
      })

      const foundCategory = await prisma.category.findFirst({
        where: {
          name: categoryName
        }
      })

      if (!product) {
        throw reply.notFound('Product not found!')
      }

      if (!foundCategory) {
        throw reply.notFound('Category not found')
      }

      const editedProduct = await prisma.product.update({
        where: {
          id
        },
        data: { count, name, price, priceUnit, categoryId: foundCategory.id }
      })

      return reply.code(200).send({
        ...editedProduct,
        updatedAt: editedProduct.updatedAt.toISOString(),
        createdAt: editedProduct.createdAt.toISOString()
      })
    })
}
