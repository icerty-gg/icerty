import { ValueError } from '@sinclair/typebox/errors'
import { Value } from '@sinclair/typebox/Value'
import { TSchema } from '@sinclair/typebox'

class TypeboxValidationError extends Error {
  constructor(private errors: ValueError[]) {
    const message = errors
      .map(error => {
        return `${error.message} at ${error.path} but got ${error.value}`
      })
      .join('\n')

    super(message)
    Object.setPrototypeOf(this, TypeboxValidationError.prototype)
  }
}

export const validateSchema = <T extends TSchema>(schema: T, value: unknown) => {
  const errors = [...Value.Errors(schema, value)]

  if (errors.length > 0) {
    throw new TypeboxValidationError(errors)
  }
}
