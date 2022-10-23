import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { isAuth } from '../../utils/IsAuth'
import { prisma } from '../../utils/prisma'

import { createProductSchema, deleteProductSchema, editProductSchema, getProductsSchema } from './products.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const productsRoutes: FastifyPluginAsync = async fastify => {
  fastify.addHook('preValidation', isAuth)

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getProductsSchema }, async (request, reply) => {
    try {
      const products = await prisma.product.findMany()

      return reply.code(200).send({
        products: products.map(p => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        }))
      })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong!' })
    }
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/', { schema: createProductSchema }, async (request, reply) => {
    try {
      const { categoryName, count, name, price, priceUnit } = request.body

      const foundCategory = await prisma.category.findFirst({
        where: {
          name: categoryName
        }
      })

      if (!foundCategory) {
        return reply.code(404).send({ message: `Category with name: '${request.body.categoryName}' does not exist!` })
      }

      const product = await prisma.product.create({
        data: { count, name, price, priceUnit, categoryId: foundCategory.id, categoryName: foundCategory.name }
      })

      return reply
        .code(201)
        .send({ ...product, updatedAt: product.updatedAt.toISOString(), createdAt: product.createdAt.toISOString() })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong!' })
    }
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteProductSchema }, async (request, reply) => {
      try {
        const { id } = request.params
        const product = await prisma.product.findFirst({
          where: {
            id
          }
        })

        if (!product) {
          return reply.code(404).send({ message: `Product with id: ${id} doesn't exist!` })
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
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong!' })
      }
    })

  fastify.withTypeProvider<TypeBoxTypeProvider>().put('/:id', { schema: editProductSchema }, async (request, reply) => {
    try {
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
        return reply.code(404).send({ message: `Product with id: ${id} doesn't exist!` })
      }

      if (!foundCategory) {
        return reply.code(404).send({ message: `Category with id: ${id} doesn't exist!` })
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
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong!' })
    }
  })
}
