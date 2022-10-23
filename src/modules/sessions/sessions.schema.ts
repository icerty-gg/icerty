import { Type } from '@sinclair/typebox'

export const loginSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: Type.Object({ token: Type.String() }),
    '4xx': Type.Object({
      message: Type.String()
    }),
    500: Type.Object({
      message: Type.String()
    })
  }
}

export const logoutSchema = {
  response: {
    200: Type.Object({ message: Type.String() }),
    500: Type.Object({
      message: Type.String()
    })
  }
}
