import { prisma } from '../../utils/prisma'

import { createCategorySchema } from './categories.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const categoriesRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createCategorySchema }, async (request, reply) => {
      try {
        const category = await prisma.category.create({ data: request.body })
        return reply.code(201).send({
          ...category,
          updatedAt: category.updatedAt.toISOString(),
          createdAt: category.createdAt.toISOString()
        })
      } catch (err) {
        void reply.code(500).send(err)
      }
    })
  fastify.get('/', async (request, reply) => {
    try {
      const categories = await prisma.category.findMany()
      return { categories }
    } catch (err) {
      void reply.code(500).send(err)
    }
  })
}
