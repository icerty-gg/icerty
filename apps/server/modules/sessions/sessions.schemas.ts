import { Type } from '@sinclair/typebox'

import { UserSchema, PasswordSchema } from '../users/users.schemas'

import { createTypeBoxFastifySchema } from './../../utils/schema'

export const loginSchema = createTypeBoxFastifySchema({
  tags: ['sessions'],
  summary: 'Login',
  body: Type.Intersect([Type.Pick(UserSchema, ['email']), Type.Object({ password: PasswordSchema })]),
  response: {
    201: UserSchema
  }
})

export const logoutSchema = createTypeBoxFastifySchema({
  tags: ['sessions'],
  summary: 'Logout',
  response: {
    204: Type.Void()
  }
})

export const getSessionSchema = createTypeBoxFastifySchema({
  tags: ['sessions'],
  summary: 'Get currently logged user',
  response: {
    200: UserSchema
  }
})
