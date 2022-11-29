import { cloudinary } from '../../utils/cloudinary'
import { prisma } from '../../utils/prisma'

import { createProductSchema, deleteProductSchema, editProductSchema, getProductsSchema } from './products.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const productsRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', { schema: getProductsSchema }, async (request, reply) => {
    const products = await prisma.product.findMany()

    return reply.code(200).send({
      products: products.map(p => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString()
      }))
    })
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/', { schema: createProductSchema, preValidation: fastify.auth(['ADMIN']) }, async (request, reply) => {
      const { categoryId, count, description, name, price, priceUnit } = request.body

      const files = await request.saveRequestFiles()

      if (!files.length) {
        throw reply.badRequest('Upload an image!')
      }

      if (files.length > 1) {
        throw reply.badRequest('Single file expected!')
      }

      if (!['image/png', 'image/jpeg'].includes(files[0].mimetype)) {
        throw reply.badRequest('Invalid file type! Supported types: png, jpg, jpeg')
      }

      const uploadedImg = await cloudinary.uploader.upload(files[0].filepath)

      const foundCategory = await prisma.category.findFirst({
        where: {
          id: categoryId
        }
      })

      if (!foundCategory) {
        throw reply.notFound('Category not found!')
      }

      const product = await prisma.product.create({
        data: {
          count,
          name,
          price,
          priceUnit,
          categoryId: foundCategory.id,
          categoryName: foundCategory.name,
          description,
          img: uploadedImg.secure_url
        }
      })

      return reply
        .code(201)
        .send({ ...product, updatedAt: product.updatedAt.toISOString(), createdAt: product.createdAt.toISOString() })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/:id', { schema: deleteProductSchema, preValidation: fastify.auth(['ADMIN']) }, async (request, reply) => {
      const { id } = request.params
      const product = await prisma.product.findFirst({
        where: {
          id
        }
      })

      if (!product) {
        throw reply.notFound('Product not found!')
      }

      const deletedProduct = await prisma.product.delete({
        where: {
          id
        }
      })

      return reply.code(200).send({
        ...deletedProduct,
        updatedAt: deletedProduct.updatedAt.toISOString(),
        createdAt: deletedProduct.createdAt.toISOString()
      })
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .put('/:id', { schema: editProductSchema, preValidation: fastify.auth(['ADMIN']) }, async (request, reply) => {
      const { id } = request.params
      const { count, description, name, price, priceUnit } = request.body

      const product = await prisma.product.findFirst({
        where: {
          id
        }
      })

      if (!product) {
        throw reply.notFound('Product not found!')
      }

      const editedProduct = await prisma.product.update({
        where: {
          id
        },
        data: { count, name, price, priceUnit, description }
      })

      return reply.code(200).send({
        ...editedProduct,
        updatedAt: editedProduct.updatedAt.toISOString(),
        createdAt: editedProduct.createdAt.toISOString()
      })
    })
}
