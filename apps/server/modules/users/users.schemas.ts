import { Type } from '@sinclair/typebox'

import { StringEnum, createTypeBoxFastifySchema } from '../../utils/schema'

import type { Static } from '@sinclair/typebox'

const PasswordSchema = Type.String({ minLength: 8, maxLength: 20 })

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 4, maxLength: 16 }),
  surname: Type.String({ minLength: 4, maxLength: 20 }),
  img: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  role: StringEnum(['admin', 'user'])
})

export type User = Static<typeof UserSchema>

export const createUserSchema = createTypeBoxFastifySchema({
  tags: ['users'],
  summary: 'Create user',
  body: Type.Intersect([Type.Omit(UserSchema, ['id', 'role', 'password']), Type.Object({ password: PasswordSchema })]),
  response: {
    201: UserSchema
  }
})

export const deleteCurrentUserSchema = createTypeBoxFastifySchema({
  tags: ['users'],
  summary: 'Delete current user',
  response: {
    204: Type.Null()
  }
})

export const deleteUserByIdSchema = createTypeBoxFastifySchema({
  tags: ['users'],
  summary: 'Delete user by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    204: Type.Null()
  }
})

export const updatePasswordSchema = createTypeBoxFastifySchema({
  tags: ['users'],
  summary: 'Update password',
  body: Type.Object({
    oldPassword: PasswordSchema,
    newPassword: PasswordSchema
  }),
  response: {
    204: Type.Null()
  }
})

export const updateEmailSchema = createTypeBoxFastifySchema({
  tags: ['users'],
  summary: 'Update email',
  body: Type.Object({
    email: Type.String({ format: 'email' })
  }),
  response: {
    204: Type.Null()
  }
})
