import { isAuth } from '../../hooks/IsAuth'
import { prisma } from '../../utils/prisma'

import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
  getCategoriesSchema
} from './categories.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const categoriesRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/', { schema: getCategoriesSchema, preValidation: isAuth(['USER', 'ADMIN']) }, async (request, reply) => {
      const categories = await prisma.category.findMany()

      return reply.code(200).send({
        categories: categories.map(c => ({
          ...c,
          updatedAt: c.updatedAt.toISOString(),
          createdAt: c.createdAt.toISOString()
        }))
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createCategorySchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
      const { name } = request.body

      const category = await prisma.category.create({ data: { name } })

      return reply.code(201).send({
        ...category,
        updatedAt: category.updatedAt.toISOString(),
        createdAt: category.createdAt.toISOString()
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteCategorySchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
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
        throw fastify.httpErrors.forbidden('This category is used in some products!')
      }

      if (!category) {
        throw fastify.httpErrors.notFound('Category not found!')
      }

      const deletedCategory = await prisma.category.delete({
        where: {
          id
        }
      })

      return reply.code(200).send({
        ...deletedCategory,
        updatedAt: deletedCategory.updatedAt.toISOString(),
        createdAt: deletedCategory.createdAt.toISOString()
      })
    })
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: editCategorySchema, preValidation: isAuth(['ADMIN']) }, async (request, reply) => {
      const { id } = request.params
      const { name } = request.body

      const category = await prisma.category.findFirst({
        where: {
          id
        }
      })

      if (!category) {
        throw fastify.httpErrors.notFound('Category not found')
      }

      const updatedCategory = await prisma.category.update({
        where: {
          id
        },
        data: {
          name
        }
      })

      return reply.code(200).send({
        ...updatedCategory,
        updatedAt: updatedCategory.updatedAt.toISOString(),
        createdAt: updatedCategory.createdAt.toISOString()
      })
    })
}
