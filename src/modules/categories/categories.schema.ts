import { Type } from '@sinclair/typebox'

import type { Static } from '@sinclair/typebox'

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  updatedAt: Type.String(),
  createdAt: Type.String()
})

export type Category = Static<typeof CategorySchema>

export const createCategorySchema = {
  body: Type.Object({
    name: Type.String()
  }),
  response: {
    201: CategorySchema,
    500: Type.Unknown()
  }
}
