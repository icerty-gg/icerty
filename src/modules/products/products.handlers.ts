import { prisma } from '../../utils/prisma'

import type { createProductSchema, Product } from './products.schema'
import type { Static } from '@sinclair/typebox'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const createProduct = async (
  request: FastifyRequest<{ readonly Body: Static<typeof createProductSchema['body']>; readonly Reply: Product }>,
  reply: FastifyReply
) => {
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
      return reply.code(201).send(product)
    }

    void reply.code(404).send({ message: `Category with name: '${request.body.categoryName}' does not exist!` })
  } catch (err) {
    void reply.code(500).send(err)
  }
}

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await prisma.product.findMany()
    return { products }
  } catch (err) {
    void reply.code(500).send(err)
  }
}
