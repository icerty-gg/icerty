import { Type, Kind } from '@sinclair/typebox'
import { Custom } from '@sinclair/typebox/custom'

import type { TSchema } from '@sinclair/typebox'
import type { FastifySchema } from 'fastify'

export const StringEnum = <T extends string[]>(values: [...T], defaultValue?: T[number]) => {
  return Type.Unsafe<T[number]>({ type: 'string', enum: values, default: defaultValue })
}

Custom.Set('buffer', (schema, value) => value instanceof Buffer)

export const BufferType = Type.Unsafe<Buffer>({ [Kind]: 'buffer' })

type Tag = 'users' | 'offers' | 'categories' | 'sessions'

type TypeBoxFastifySchema = Partial<
  Record<keyof Omit<FastifySchema, 'response' | 'tags' | 'summary' | 'consumes'>, TSchema>
> & {
  consumes?: string[]
  response: { [statusCode: number]: TSchema }
  summary: string
  tags: [Tag]
}

export const createTypeBoxFastifySchema = <T extends TypeBoxFastifySchema>(schema: T): T => schema
