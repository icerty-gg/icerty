import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { prisma } from '../../utils/prisma'

import { isAuth } from './../../utils/IsAuth'
import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
  getCategoriesSchema
} from './categories.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const categoriesRoutes: FastifyPluginAsync = async fastify => {
  fastify.addHook('preValidation', isAuth)

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getCategoriesSchema }, async (request, reply) => {
    try {
      const categories = await prisma.category.findMany()

      return reply.code(200).send({
        categories: categories.map(c => ({
          ...c,
          updatedAt: c.updatedAt.toISOString(),
          createdAt: c.createdAt.toISOString()
        }))
      })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }

      return reply.code(500).send({ message: 'Something went wrong!' })
    }
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createCategorySchema }, async (request, reply) => {
      try {
        const { name } = request.body

        const category = await prisma.category.create({ data: { name } })

        return reply.code(201).send({
          ...category,
          updatedAt: category.updatedAt.toISOString(),
          createdAt: category.createdAt.toISOString()
        })
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong!' })
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

        return reply.code(200).send({
          ...deletedCategory,
          updatedAt: deletedCategory.updatedAt.toISOString(),
          createdAt: deletedCategory.createdAt.toISOString()
        })
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong!' })
      }
    })
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: editCategorySchema }, async (request, reply) => {
      try {
        const { id } = request.params
        const { name } = request.body

        const category = await prisma.category.findFirst({
          where: {
            id
          }
        })

        if (!category) {
          return reply.code(404).send({ message: `Category with id: ${id} doesn't exist!` })
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
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong!' })
      }
    })
}
