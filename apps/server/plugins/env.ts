import fastifyEnv from '@fastify/env'
import { Type } from '@sinclair/typebox'
import fp from 'fastify-plugin'

import type { Static } from '@sinclair/typebox'
import type { FastifyPluginAsync } from 'fastify'

const schema = Type.Object({
  PORT: Type.Number(),
  COOKIE_SECRET: Type.String(),
  NODE_ENV: Type.Union([Type.Literal('development'), Type.Literal('production')]),
  SUPABASE_API_SECRET: Type.String(),
  SUPABASE_URL: Type.String()
})

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof schema>
  }
}

const envPlugin: FastifyPluginAsync = async fastify => {
  await fastify.register(fastifyEnv, {
    schema,
    dotenv: true
  })
}

export default fp(envPlugin)
