import { Type } from '@sinclair/typebox'
import { UserSchema } from '../users'

export const loginSchema = {
  tags: ['session'],
  summary: 'Login',
  body: Type.Object({
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: UserSchema
  }
}

export const logoutSchema = {
  tags: ['session'],
  summary: 'Logout',
  response: {
    200: Type.Object({ message: Type.String() })
  }
}

export const getSessionSchema = {
  tags: ['session'],
  summary: 'Get currently logged user',
  response: {
    200: UserSchema
  }
}
