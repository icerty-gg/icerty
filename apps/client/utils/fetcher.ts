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
const putApiuserspassword_Body = z.object({ oldPassword: z.string(), newPassword: z.string().min(8).max(20) })

const endpoints = makeApi([
  {
    method: 'get',
    path: '/api/categories/',
    requestFormat: 'json',
    response: z.array(
      z.object({
        id: z.string(),
        name: z.string().min(3),
        updatedAt: z.string(),
        createdAt: z.string(),
        img: z.string()
      })
    )
  },
  {
    method: 'post',
    path: '/api/categories/',
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
    path: '/api/categories/:id',
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
      name: z.string().min(3),
      updatedAt: z.string(),
      createdAt: z.string(),
      img: z.string()
    })
  },
  {
    method: 'put',
    path: '/api/categories/:id',
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
    response: z.object({
      id: z.string(),
      name: z.string().min(3),
      updatedAt: z.string(),
      createdAt: z.string(),
      img: z.string()
    })
  },
  {
    method: 'get',
    path: '/api/offers/',
    requestFormat: 'json',
    response: z.array(
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
          img: z.string(),
          email: z.string().email(),
          password: z.string().min(8).max(20),
          role: z.union([
            z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
            z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
          ])
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
    )
  },
  {
    method: 'post',
    path: '/api/offers/',
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
        password: z.string().min(8).max(20),
        role: z.union([
          z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
          z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
        ])
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
    path: '/api/offers/:id',
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
    path: '/api/offers/:id',
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
    path: '/api/offers/:id',
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
    path: '/api/sessions/login',
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
      password: z.string().min(8).max(20),
      role: z.union([
        z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
        z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
      ])
    })
  },
  {
    method: 'post',
    path: '/api/sessions/logout',
    requestFormat: 'json',
    response: z.object({ message: z.string() })
  },
  {
    method: 'get',
    path: '/api/sessions/me',
    requestFormat: 'json',
    response: z.object({
      id: z.string(),
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      role: z.union([
        z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
        z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
      ])
    })
  },
  {
    method: 'delete',
    path: '/api/users/:id',
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
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      role: z.union([
        z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
        z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
      ])
    })
  },
  {
    method: 'put',
    path: '/api/users/email',
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
    path: '/api/users/me',
    requestFormat: 'json',
    response: z.object({
      id: z.string(),
      name: z.string().min(4).max(16),
      surname: z.string().min(4).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      role: z.union([
        z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
        z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
      ])
    })
  },
  {
    method: 'put',
    path: '/api/users/password',
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
    path: '/api/users/register',
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
      password: z.string().min(8).max(20),
      role: z.union([
        z.union([z.enum(['ADMIN']), z.enum(['USER'])]),
        z.array(z.union([z.enum(['ADMIN']), z.enum(['USER'])]))
      ])
    })
  }
])

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not set!')
}

export const api = new Zodios(apiUrl, endpoints)
