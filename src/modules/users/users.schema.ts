import { Type } from '@sinclair/typebox'

import type { Static } from '@sinclair/typebox'

const PasswordSchema = Type.String({ minLength: 8, maxLength: 20 })

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 4, maxLength: 16 }),
  surname: Type.String({ minLength: 4, maxLength: 20 }),
  img: Type.String(),
  email: Type.String({ format: 'email' }),
  password: PasswordSchema,
  role: Type.Union([Type.Literal('ADMIN'), Type.Literal('USER')])
})

export type User = Static<typeof UserSchema>

export const createUserSchema = {
  body: Type.Omit(UserSchema, ['id', 'role']),
  response: {
    201: UserSchema
  }
}

export const deleteCurrentUserSchema = {
  response: {
    200: UserSchema
  }
}

export const deleteUserByIdSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: UserSchema
  }
}

export const updatePasswordSchema = {
  body: Type.Object({
    oldPassword: Type.String(),
    newPassword: PasswordSchema
  })
}

export const updateEmailSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' })
  })
}
