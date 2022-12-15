import { createOfferSchema, deleteOfferSchema, updateOfferSchema, getAllOffersSchema, getOfferSchema } from 'common'
import streamifier from 'streamifier'

import { cloudinary } from '../../utils/cloudinary'
import { prisma } from '../../utils/prisma'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const offersRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getAllOffersSchema }, async (request, reply) => {
    const offers = await prisma.offer.findMany({
      include: {
        offerImage: {
          select: {
            id: true,
            img: true
          }
        },
        category: true,
        user: true
      }
    })

    return reply.code(200).send(
      offers.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
        category: {
          ...o.category,
          createdAt: o.category.createdAt.toISOString(),
          updatedAt: o.category.updatedAt.toISOString()
        }
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
      const { categoryId, count, description, images, name, price } = request.body

      if (images.some(img => !['image/png', 'image/jpeg'].includes(img.mimetype))) {
        throw reply.badRequest('Invalid image mimetype! Supported mimetypes: image/png, image/jpeg')
      }

      const urls: { img: string }[] = []
      images.forEach(file => {
        const cld_upload_stream = cloudinary.uploader.upload_stream((err, result) => {
          if (!result) {
            throw reply.internalServerError('Failed to upload image!')
          }

          urls.push({ img: result.secure_url })
        })

        // eslint-disable-next-line -- buffer typed as any for now
        streamifier.createReadStream(file.data).pipe(cld_upload_stream)
      })

      // to fix urls are empty array!
      console.log(urls)

      const offer = await prisma.offer.create({
        data: {
          count,
          name,
          price,
          description,
          categoryId,
          userId: request.session.user.id,
          offerImage: {
            createMany: {
              data: urls
            }
          }
        }
      })
      return reply
        .code(201)
        .send({ ...offer, updatedAt: offer.updatedAt.toISOString(), createdAt: offer.createdAt.toISOString() })
    })

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

      const { categoryId, count, description, isPromoted, name, price } = request.body

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
        data: { count, name, price, categoryId, description, isPromoted }
      })

      return reply.code(204).send()
    })
}
