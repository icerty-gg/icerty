import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { prisma } from '../../utils/prisma'

import { createCategorySchema, deleteCategorySchema } from './categories.schema'

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
        if (err instanceof PrismaClientKnownRequestError) {
          return reply.code(Number(err.code)).send({ message: err.message })
        }
        void reply.code(500).send({ message: 'Something went wrong' })
      }
    })
  fastify.get('/', async (request, reply) => {
    try {
      const categories = await prisma.category.findMany()
      void reply.code(200).send({ categories })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        return reply.code(Number(err.code)).send({ message: err.message })
      }
      void reply.code(500).send({ message: 'Something went wrong' })
    }
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteCategorySchema }, async (request, reply) => {
      try {
        const { id } = request.params
        const category = await prisma.category.findFirst({
          where: {
            id
          }
        })

        const product = await prisma.product.findFirst({
          where: {
            categoryId: id
          }
        })

        if (product) {
          return reply.code(403).send({ message: `Cannot delete category with id: ${id}!` })
        }

        if (!category) {
          return reply.code(404).send({ message: `Category with id: ${id} doesn't exist!` })
        }

        const deletedCategory = await prisma.category.delete({
          where: {
            id
          }
        })

        void reply.code(200).send(deletedCategory)
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          return reply.code(Number(err.code)).send({ message: err.message })
        }
        void reply.code(500).send({ message: 'Something went wrong' })
      }
    })
}
