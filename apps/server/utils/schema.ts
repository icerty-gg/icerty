import { Type, Kind } from '@sinclair/typebox'
import { Custom } from '@sinclair/typebox/custom'

export const StringEnum = <T extends string[]>(values: [...T]) => {
  return Type.Unsafe<T[number]>({ type: 'string', enum: values })
}

Custom.Set('buffer', (schema, value) => value instanceof Buffer)

export const BufferType = Type.Unsafe<Buffer>({ [Kind]: 'buffer' })
