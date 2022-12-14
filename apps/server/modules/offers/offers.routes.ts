import {
  createOfferSchema,
  deleteOfferSchema,
  updateOfferSchema,
  getAllOffersSchema,
  getOfferSchema,
  updateOffersImagesSchema
} from 'common'

import { cloudinary } from '../../utils/cloudinary'
import { prisma } from '../../utils/prisma'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const offersRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getAllOffersSchema }, async (request, reply) => {
    const offers = await prisma.offer.findMany({
      include: {
        category: true,
        user: true,
        offerImage: true
      }
    })

    return reply.code(200).send(
      offers.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString()
      }))
    )
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/:id', { schema: getOfferSchema }, async (request, reply) => {
    const { id } = request.params

    const offer = await prisma.offer.findFirst({ where: { id } })

    if (!offer) {
      throw reply.notFound('Offer not found!')
    }

    return reply
      .code(200)
      .send({ ...offer, createdAt: offer.createdAt.toISOString(), updatedAt: offer.updatedAt.toISOString() })
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createOfferSchema, preValidation: fastify.auth(['USER']) }, async (request, reply) => {
      const { categoryId, count, description, name, price } = request.body

      const offer = await prisma.offer.create({
        data: {
          count,
          name,
          price,
          description,
          categoryId,
          userId: request.session.user.id
        }
      })
      return reply
        .code(201)
        .send({ ...offer, updatedAt: offer.updatedAt.toISOString(), createdAt: offer.createdAt.toISOString() })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put(
      '/photo/:id',
      { schema: updateOffersImagesSchema, preValidation: fastify.auth(['USER']) },
      async (request, reply) => {
        const { id } = request.params

        const files = await request.saveRequestFiles()

        if (!files.length) {
          throw reply.badRequest('File not found!')
        }

        const offer = await prisma.offer.findFirst({
          where: { id }
        })

        if (!offer) {
          throw reply.notFound('Offer not found!')
        }

        const urls = await Promise.all(files.map(file => cloudinary.uploader.upload(file.filepath)))

        await prisma.offerImage.createMany({
          data: files.map((_, i) => ({
            offerId: id,
            img: urls[i].secure_url
          }))
        })

        return reply.code(204).send()
      }
    )

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteOfferSchema, preValidation: fastify.auth(['USER']) }, async (request, reply) => {
      const { id } = request.params

      const offer = await prisma.offer.findFirst({
        where: { id }
      })

      if (!offer) {
        throw reply.notFound('Offer not found!')
      }

      if (offer.userId !== request.session.user.id) {
        throw reply.forbidden('You can only delete your own offers!')
      }

      await prisma.offer.delete({
        where: { id }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: updateOfferSchema, preValidation: fastify.auth(['USER']) }, async (request, reply) => {
      const { id } = request.params

      const { categoryId, count, description, name, price } = request.body

      const offer = await prisma.offer.findFirst({
        where: { id }
      })

      if (!offer) {
        throw reply.notFound('Offer not found!')
      }

      if (offer.userId !== request.session.user.id) {
        throw reply.forbidden('You can only edit your own offers!')
      }

      await prisma.offer.update({
        where: { id },
        data: { count, name, price, categoryId, description }
      })

      return reply.code(204).send()
    })
}
