import { Type } from '@sinclair/typebox'

import type { Static } from '@sinclair/typebox'

const PasswordSchema = Type.String({ minLength: 8, maxLength: 20 })

enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: 'string', enum: values })
}

const Role = StringEnum(['ADMIN', 'USER'])

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 4, maxLength: 16 }),
  surname: Type.String({ minLength: 4, maxLength: 20 }),
  img: Type.String(),
  email: Type.String({ format: 'email' }),
  password: PasswordSchema,
  role: Role
})

export type User = Static<typeof UserSchema>

export const createUserSchema = {
  tags: ['users'],
  summary: 'Create user',
  body: Type.Omit(UserSchema, ['id', 'role']),
  response: {
    201: UserSchema
  }
}

export const deleteCurrentUserSchema = {
  tags: ['users'],
  summary: 'Delete current user',
  response: {
    200: UserSchema
  }
}

export const deleteUserByIdSchema = {
  tags: ['users'],
  summary: 'Delete user by id',
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: UserSchema
  }
}

export const updatePasswordSchema = {
  tags: ['users'],
  summary: 'Update password',
  body: Type.Object({
    oldPassword: Type.String(),
    newPassword: PasswordSchema
  })
}

export const updateEmailSchema = {
  tags: ['users'],
  summary: 'Update email',
  body: Type.Object({
    email: Type.String({ format: 'email' })
  })
}
