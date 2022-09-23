import { prisma } from '../../utils/prisma'

import { createProductSchema } from './products.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line -- routes
export const productsRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/', { schema: createProductSchema }, async (request, reply) => {
    try {
      const foundCategory = await prisma.category.findFirst({
        where: {
          name: request.body.categoryName
        }
      })

      if (foundCategory) {
        const product = await prisma.product.create({
          data: { ...request.body, categoryId: foundCategory.id, categoryName: foundCategory.name }
        })

        return reply
          .code(201)
          .send({ ...product, updatedAt: product.updatedAt.toISOString(), createdAt: product.createdAt.toISOString() })
      }

      void reply
        .code(404)
        .send({ message: `Category with name: '${request.body.categoryName}' does not exist!`, statusCode: 404 })
    } catch (err) {
      void reply.code(500).send(err)
    }
  })
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', async (request, reply) => {
    try {
      const products = await prisma.product.findMany()
      return { products }
    } catch (err) {
      void reply.code(500).send(err)
    }
  })
}
