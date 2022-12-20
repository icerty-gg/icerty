import { prisma } from '../../utils/prisma'

import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
  getCategoriesSchema
} from './categories.schemas'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const categoriesRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getCategoriesSchema }, async (request, reply) => {
    const categories = await prisma.category.findMany()

    return reply.code(200).send({
      data: categories.map(c => ({
        ...c,
        updatedAt: c.updatedAt.toISOString(),
        createdAt: c.createdAt.toISOString()
      }))
    })
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createCategorySchema, preValidation: fastify.auth(['admin']) }, async (request, reply) => {
      const { img, name } = request.body

      const category = await prisma.category.create({ data: { name, img } })

      return reply.code(201).send({
        ...category,
        updatedAt: category.updatedAt.toISOString(),
        createdAt: category.createdAt.toISOString()
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete(
      '/:id',
      { schema: deleteCategorySchema, preValidation: fastify.auth(['admin']) },
      async (request, reply) => {
        const { id } = request.params
        const category = await prisma.category.findFirst({
          where: {
            id
          }
        })

        const product = await prisma.offer.findFirst({
          where: {
            categoryId: id
          }
        })

        if (product) {
          throw reply.forbidden('This category is used in some products!')
        }

        if (!category) {
          throw reply.notFound('Category not found!')
        }

        await prisma.category.delete({
          where: {
            id
          }
        })

        return reply.code(200).send()
      }
    )
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: updateCategorySchema, preValidation: fastify.auth(['admin']) }, async (request, reply) => {
      const { id } = request.params
      const { img, name } = request.body

      const category = await prisma.category.findFirst({
        where: {
          id
        }
      })

      if (!category) {
        throw reply.notFound('Category not found!')
      }

      await prisma.category.update({
        where: {
          id
        },
        data: {
          name,
          img
        }
      })

      return reply.code(200).send()
    })
}
