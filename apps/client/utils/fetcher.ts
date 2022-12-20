import { makeApi, Zodios } from '@zodios/core'
import { z } from 'zod'

const postApisessionslogin_Body = z.object({ email: z.string(), password: z.string() })
const postApioffers_Body = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  count: z.number(),
  price: z.number(),
  images: z.array(
    z.object({
      data: z.unknown(),
      filename: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      limit: z.boolean()
    })
  )
})
const putApioffersId_Body = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  count: z.number(),
  price: z.number(),
  isPromoted: z.boolean()
})
const postApicategories_Body = z.object({ name: z.string().min(3), img: z.string() })
const postApiusersregister_Body = z.object({
  name: z.string().min(4).max(16),
  surname: z.string().min(4).max(20),
  img: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(20)
})
const putApiuserspassword_Body = z.object({
  oldPassword: z.string().min(8).max(20),
  newPassword: z.string().min(8).max(20)
})

const endpoints = makeApi([
  {
    method: 'get',
    path: '/',
    requestFormat: 'json',
    response: z.string()
  },
  {
    method: 'get',
    path: '/categories/',
    requestFormat: 'json',
    response: z.object({
      data: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(3),
          updatedAt: z.string(),
          createdAt: z.string(),
          img: z.string()
        })
      )
    })
  },
  {
    method: 'post',
    path: '/categories/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApicategories_Body
      }
    ],
    response: z.object({
      id: z.string(),
      name: z.string().min(3),
      updatedAt: z.string(),
      createdAt: z.string(),
      img: z.string()
    })
  },
  {
    method: 'delete',
    path: '/categories/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void()
  },
  {
    method: 'put',
    path: '/categories/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApicategories_Body
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void()
  },
  {
    method: 'get',
    path: '/offers/',
    requestFormat: 'json',
    response: z.object({
      data: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          categoryId: z.string(),
          userId: z.string(),
          count: z.number(),
          price: z.number(),
          isPromoted: z.boolean(),
          updatedAt: z.string(),
          createdAt: z.string(),
          user: z.object({
            id: z.string(),
            name: z.string().min(4).max(16),
            surname: z.string().min(4).max(20),
            img: z.string()
          }),
          images: z.array(z.object({ id: z.string(), img: z.string() })),
          category: z.object({ id: z.string(), name: z.string().min(3), img: z.string() })
        })
      )
    })
  },
  {
    method: 'post',
    path: '/offers/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApioffers_Body
      }
    ],
    response: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      categoryId: z.string(),
      userId: z.string(),
      count: z.number(),
      price: z.number(),
      isPromoted: z.boolean(),
      updatedAt: z.string(),
      createdAt: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string().min(4).max(16),
        surname: z.string().min(4).max(20),
        img: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['ADMIN', 'USER'])
      }),
      images: z.array(z.object({ id: z.string(), img: z.string() })),
      category: z.object({
        id: z.string(),
        name: z.string().min(3),
        updatedAt: z.string(),
        createdAt: z.string(),
        img: z.string()
      })
    })
  },
  {
    method: 'get',
    path: '/offers/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      categoryId: z.string(),
      userId: z.string(),
      count: z.number(),
      price: z.number(),
      isPromoted: z.boolean(),
      updatedAt: z.string(),
      createdAt: z.string()
    })
  },
  {
    method: 'delete',
    path: '/offers/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void()
  },
  {
    method: 'put',
    path: '/offers/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: putApioffersId_Body
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void()
  },
  {
    method: 'post',
    path: '/sessions/login',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApisessionslogin_Body
      }
    ],
    response: z.object({
      id: z.string(),
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['ADMIN', 'USER'])
    })
  },
  {
    method: 'post',
    path: '/sessions/logout',
    requestFormat: 'json',
    response: z.void()
  },
  {
    method: 'get',
    path: '/sessions/me',
    requestFormat: 'json',
    response: z.object({
      id: z.string(),
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['ADMIN', 'USER'])
    })
  },
  {
    method: 'delete',
    path: '/users/:id',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void()
  },
  {
    method: 'put',
    path: '/users/email',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ email: z.string().email() })
      }
    ],
    response: z.void()
  },
  {
    method: 'delete',
    path: '/users/me',
    requestFormat: 'json',
    response: z.void()
  },
  {
    method: 'put',
    path: '/users/password',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: putApiuserspassword_Body
      }
    ],
    response: z.void()
  },
  {
    method: 'post',
    path: '/users/register',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApiusersregister_Body
      }
    ],
    response: z.object({
      id: z.string(),
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['ADMIN', 'USER'])
    })
  }
])

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not set!')
}

export const api = new Zodios(apiUrl, endpoints)
