import { prisma } from '../../utils/prisma'

import type { FastifyReply, FastifyRequest } from 'fastify'

export const createCategory = async (
  request: FastifyRequest<{ readonly Body: { readonly name: string } }>,
  reply: FastifyReply
) => {
  try {
    const { name } = request.body
    const category = await prisma.category.create({ data: { name } })
    return reply.code(201).send({ category })
  } catch (err) {
    void reply.send(err).status(500)
  }
}

export const getCategories = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const categories = await prisma.category.findMany()
    return { categories }
  } catch (err) {
    void reply.send(err).status(500)
  }
}
