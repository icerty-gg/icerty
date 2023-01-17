import { randomUUID } from 'crypto'

import {
  createOfferSchema,
  deleteOfferSchema,
  updateOfferSchema,
  getAllOffersSchema,
  getOfferSchema,
  getMyFollowedOffersSchema,
  followOfferSchema,
  unfollowOfferSchema
} from './offers.schemas'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

const offersPlugin: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getAllOffersSchema }, async (request, reply) => {
    const {
      category,
      city,
      count_from,
      count_to,
      name,
      order_by,
      order_direction,
      page,
      price_from,
      price_to,
      promoted
    } = request.query

    const OFFERS_SHOWN = 20

    const offers = await fastify.prisma.offer.findMany({
      skip: (page - 1) * OFFERS_SHOWN,
      take: OFFERS_SHOWN,
      orderBy: {
        [order_by]: order_direction
      },
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
        city: {
          contains: city,
          mode: 'insensitive'
        },
        count: {
          gte: count_from,
          lte: count_to
        },
        price: {
          gte: price_from,
          lte: price_to
        },
        isPromoted: promoted,
        category: {
          name: {
            contains: category,
            mode: 'insensitive'
          }
        }
      },
      include: {
        offerImage: {
          select: {
            id: true,
            img: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            img: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            img: true
          }
        }
      }
    })

    const count = await fastify.prisma.offer.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
        city: {
          contains: city,
          mode: 'insensitive'
        },
        count: {
          gte: count_from,
          lte: count_to
        },
        price: {
          gte: price_from,
          lte: price_to
        },
        isPromoted: promoted,
        category: {
          name: {
            contains: category,
            mode: 'insensitive'
          }
        }
      }
    })

    return reply.code(200).send({
      offers: offers.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
        images: o.offerImage
      })),
      maxPage: Math.ceil(offers.length / OFFERS_SHOWN),
      count
    })
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/:id', { schema: getOfferSchema }, async (request, reply) => {
    const { id } = request.params

    const offer = await fastify.prisma.offer.findFirst({
      where: { id },
      include: {
        offerImage: true,
        user: {
          select: {
            img: true,
            name: true,
            surname: true,
            createdAt: true,
            email: true
          }
        },
        category: {
          select: {
            name: true,
            img: true
          }
        }
      }
    })

    if (!offer) {
      throw reply.notFound('Offer not found!')
    }

    return reply.code(200).send({
      ...offer,
      createdAt: offer.createdAt.toISOString(),
      updatedAt: offer.updatedAt.toISOString(),
      images: offer.offerImage,
      user: {
        ...offer.user,
        createdAt: offer.user.createdAt.toISOString()
      },
      category: offer.category
    })
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createOfferSchema, preValidation: fastify.auth() }, async (request, reply) => {
      const { categoryId, city, condition, count, description, images, name, price } = request.body

      if (images.some(file => !['image/png', 'image/jpeg'].includes(file.mimetype))) {
        throw reply.badRequest('Invalid image mimetype! Supported mimetypes: image/png, image/jpeg')
      }

      const promises = images.map(async file => {
        const { data, error } = await fastify.supabase.storage.from('offers').upload(randomUUID(), file.data, {
          contentType: file.mimetype
        })

        if (error) {
          throw reply.internalServerError(error.message)
        }

        const { data: url } = fastify.supabase.storage.from('offers').getPublicUrl(data.path)

        return { img: url.publicUrl }
      })

      const urls = await Promise.all(promises)

      await fastify.prisma.offer.create({
        data: {
          count,
          name,
          price,
          description,
          categoryId,
          city,
          condition,
          userId: request.session.user.id,
          offerImage: {
            createMany: {
              data: urls
            }
          }
        }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteOfferSchema, preValidation: fastify.auth() }, async (request, reply) => {
      const { id } = request.params
      const { user } = request.session

      const offer = await fastify.prisma.offer.findFirst({
        where: { id }
      })

      if (!offer) {
        throw reply.notFound('Offer not found!')
      }

      if (user.role === 'user' && offer.userId !== user.id) {
        throw reply.forbidden('You can only delete your own offers!')
      }

      await fastify.prisma.offer.delete({
        where: { id }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: updateOfferSchema, preValidation: fastify.auth() }, async (request, reply) => {
      const { id } = request.params

      const { categoryId, city, condition, count, description, isPromoted, name, price } = request.body

      const offer = await fastify.prisma.offer.findFirst({
        where: { id }
      })

      if (!offer) {
        throw reply.notFound('Offer not found!')
      }

      if (offer.userId !== request.session.user.id) {
        throw reply.forbidden('You can only update your own offers!')
      }

      await fastify.prisma.offer.update({
        where: { id },
        data: { count, name, price, categoryId, description, isPromoted, city, condition }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/follow/:id', { schema: followOfferSchema, preValidation: fastify.auth() }, async (request, reply) => {
      await fastify.prisma.followedOffers.create({
        data: { offerId: request.params.id, userId: request.session.user.id }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/follow/:id', { schema: unfollowOfferSchema, preValidation: fastify.auth() }, async (request, reply) => {
      const followedOffer = await fastify.prisma.followedOffers.findFirst({
        where: {
          offerId: request.params.id,
          userId: request.session.user.id
        }
      })

      if (!followedOffer) {
        throw reply.notFound('Offer not found!')
      }

      await fastify.prisma.followedOffers.delete({
        where: { id: followedOffer.id }
      })

      return reply.code(204).send()
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/followed', { schema: getMyFollowedOffersSchema, preValidation: fastify.auth() }, async (request, reply) => {
      const followedOffers = await fastify.prisma.followedOffers.findMany({
        where: { userId: request.session.user.id },
        include: {
          offer: {
            include: {
              offerImage: true
            }
          }
        }
      })

      return reply.code(200).send({
        offers: followedOffers.map(o => ({
          ...o.offer,
          createdAt: o.offer.createdAt.toISOString(),
          updatedAt: o.offer.updatedAt.toISOString(),
          images: o.offer.offerImage
        }))
      })
    })
}

export default offersPlugin
