import { Type } from '@sinclair/typebox'

export const StringEnum = <T extends string[]>(values: [...T]) => {
  return Type.Unsafe<T[number]>({ type: 'string', enum: values })
}
