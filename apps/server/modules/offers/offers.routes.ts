import { randomUUID } from 'crypto'

import { prisma } from '../../utils/prisma'
import { supabase } from '../../utils/supabase'

import {
  createOfferSchema,
  deleteOfferSchema,
  updateOfferSchema,
  getAllOffersSchema,
  getOfferSchema
} from './offers.schemas'

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

    return reply.code(200).send({
      data: offers.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
        category: {
          ...o.category,
          createdAt: o.category.createdAt.toISOString(),
          updatedAt: o.category.updatedAt.toISOString()
        },
        images: o.offerImage
      }))
    })
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

      if (images.some(file => !['image/png', 'image/jpeg'].includes(file.mimetype))) {
        throw reply.badRequest('Invalid image mimetype! Supported mimetypes: image/png, image/jpeg')
      }

      const promises = images.map(async file => {
        const { data, error } = await supabase.storage.from('offers').upload(randomUUID(), file.data, {
          contentType: file.mimetype
        })

        if (error) {
          throw reply.internalServerError(error.message)
        }

        const { data: url } = supabase.storage.from('offers').getPublicUrl(data.path)

        return { img: url.publicUrl }
      })

      const urls = await Promise.all(promises)

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
        },
        include: {
          category: true,
          offerImage: true,
          user: true
        }
      })
      return reply.code(201).send({
        ...offer,
        updatedAt: offer.updatedAt.toISOString(),
        createdAt: offer.createdAt.toISOString(),
        category: {
          ...offer.category,
          createdAt: offer.category.createdAt.toISOString(),
          updatedAt: offer.category.updatedAt.toISOString()
        },
        images: offer.offerImage
      })
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
        throw reply.forbidden('You can only update your own offers!')
      }

      await prisma.offer.update({
        where: { id },
        data: { count, name, price, categoryId, description, isPromoted }
      })

      return reply.code(204).send()
    })
}
