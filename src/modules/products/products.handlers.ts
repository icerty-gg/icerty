import { prisma } from '../../utils/prisma'

import type { FastifyReply, FastifyRequest } from 'fastify'

export const createProduct = async (
  request: FastifyRequest<{ readonly Body: { readonly category: string; readonly name: string } }>,
  reply: FastifyReply
) => {
  try {
    const { category, name } = request.body

    const foundCategory = await prisma.category.findFirst({
      where: {
        name: category
      }
    })

    if (foundCategory) {
      return reply.code(201).send({ name, category })
    }

    void reply.code(404).send({ message: `Category with name: '${category}' does not exist!` })
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
