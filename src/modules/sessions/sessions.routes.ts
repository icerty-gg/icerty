import crypto from 'crypto'

import bcrypt from 'bcrypt'

import { isAuth } from '../../hooks/IsAuth'
import { prisma } from '../../utils/prisma'

import { loginSchema, logoutSchema } from './sessions.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const sessionRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/login', { schema: loginSchema }, async (request, reply) => {
    const { email, password } = request.body

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase()
      }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw fastify.httpErrors.notFound('Invalid username or password!')
    }

    const token = await new Promise<string>((resolve, reject) => {
      crypto.randomBytes(48, (err, buffer) => {
        if (err) {
          reject(err)
        } else {
          resolve(buffer.toString('base64'))
        }
      })
    })

    const expiration_date = new Date()

    expiration_date.setTime(expiration_date.getTime() + 86400000)

    await prisma.auth_tokens.create({ data: { token, userId: user.id, expiration_date } })

    return reply
      .setCookie('token', token, { path: '/', expires: expiration_date, sameSite: 'lax' })
      .code(201)
      .send({ token })
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/logout', { schema: logoutSchema, preValidation: isAuth(['USER', 'ADMIN']) }, async (request, reply) => {
      const { token } = request.cookies

      await prisma.auth_tokens.delete({ where: { token } })

      return reply.code(200).send({ message: 'Logged out' })
    })
}
