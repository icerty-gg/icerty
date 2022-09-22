import type { TSchema } from '@sinclair/typebox'
import type { FastifySchema } from 'fastify'

export type TypeBoxFastifySchema = Partial<Record<keyof Omit<FastifySchema, 'response'>, TSchema>> & {
  readonly response?: { readonly [statusCode: number]: TSchema }
}
