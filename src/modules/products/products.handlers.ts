import { prisma } from '../../utils/prisma'

import type { FastifyReply, FastifyRequest } from 'fastify'

export const createProduct = async (
  request: FastifyRequest<{ readonly Body: { readonly category: string; readonly name: string } }>,
  reply: FastifyReply
) => {
  const { category, name } = request.body

  const foundCategory = await prisma.category.findFirst({
    where: {
      name: category
    }
  })

  if (foundCategory) {
    return { name, category }
  }

  void reply.send({ message: `Category with name: '${category}' does not exist!` }).status(404)
}

export const getProducts = async () => {
  const products = await prisma.product.findMany()

  return { products }
}
