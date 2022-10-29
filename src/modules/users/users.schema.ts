import { Type } from '@sinclair/typebox'

const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  surname: Type.String(),
  email: Type.String(),
  password: Type.String(),
  role: Type.Union([Type.Literal('ADMIN'), Type.Literal('USER')])
})

export const createUserSchema = {
  body: Type.Object({
    name: Type.String(),
    surname: Type.String(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Optional(Type.Union([Type.Literal('ADMIN'), Type.Literal('USER')]))
  }),
  response: {
    201: UserSchema
  }
}
export const getCurrentUserSchema = {
  response: {
    200: UserSchema
  }
}
