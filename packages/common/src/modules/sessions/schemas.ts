import { Type } from '@sinclair/typebox'
import { UserSchema } from '../users'

export const loginSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: UserSchema
  }
}

export const logoutSchema = {
  response: {
    200: Type.Object({ message: Type.String() })
  }
}

export const getSessionSchema = {
  response: {
    200: UserSchema
  }
}
