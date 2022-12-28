import { makeApi, Zodios } from '@zodios/core'
import { z } from 'zod'

const postApisessionslogin_Body = z.object({ email: z.string().email(), password: z.string().min(8).max(20) })
const postApioffers_Body = z.object({
  name: z.string().min(8).max(50),
  description: z.string().min(50).max(1500),
  categoryId: z.string(),
  count: z.number().gte(1),
  price: z.number().gte(1),
  city: z.string().min(3).max(50),
  condition: z.enum(['new', 'used']),
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
  name: z.string().min(8).max(50),
  description: z.string().min(50).max(1500),
  categoryId: z.string(),
  count: z.number().gte(1),
  price: z.number().gte(1),
  isPromoted: z.boolean(),
  city: z.string().min(3).max(50),
  condition: z.enum(['new', 'used'])
})
const postApicategories_Body = z.object({
  name: z.string().min(3),
  img: z.array(
    z.object({
      data: z.unknown(),
      filename: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      limit: z.boolean()
    })
  )
})
const putApicategoriesId_Body = z.object({ name: z.string().min(3), img: z.string() })
const postApiusersregister_Body = z.object({
  name: z.string().min(3).max(16),
  surname: z.string().min(3).max(20),
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
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApicategories_Body
      }
    ],
    response: z.void()
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
        schema: putApicategoriesId_Body
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
    parameters: [
      {
        name: 'city',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'name',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'page',
        type: 'Query',
        schema: z.number().gte(1).default(1)
      },
      {
        name: 'price_from',
        type: 'Query',
        schema: z.number().gte(1).optional()
      },
      {
        name: 'price_to',
        type: 'Query',
        schema: z.number().gte(1).optional()
      },
      {
        name: 'count_from',
        type: 'Query',
        schema: z.number().gte(1).optional()
      },
      {
        name: 'count_to',
        type: 'Query',
        schema: z.number().gte(1).optional()
      },
      {
        name: 'category',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'order_direction',
        type: 'Query',
        schema: z.enum(['asc', 'desc']).default('asc')
      },
      {
        name: 'order_by',
        type: 'Query',
        schema: z.enum(['price', 'createdAt']).default('createdAt')
      }
    ],
    response: z.object({
      maxPage: z.number().gte(1),
      data: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(8).max(50),
          description: z.string().min(50).max(1500),
          categoryId: z.string(),
          userId: z.string(),
          count: z.number().gte(1),
          price: z.number().gte(1),
          isPromoted: z.boolean(),
          updatedAt: z.string(),
          createdAt: z.string(),
          city: z.string().min(3).max(50),
          condition: z.enum(['new', 'used']),
          images: z.array(z.object({ id: z.string(), img: z.string() })),
          user: z.object({
            id: z.string(),
            name: z.string().min(3).max(16),
            surname: z.string().min(3).max(20),
            img: z.string()
          }),
          category: z.object({ id: z.string(), name: z.string().min(3), img: z.string() })
        })
      )
    })
  },
  {
    method: 'post',
    path: '/offers/',
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: postApioffers_Body
      }
    ],
    response: z.void()
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
      offer: z.object({
        id: z.string(),
        name: z.string().min(8).max(50),
        description: z.string().min(50).max(1500),
        categoryId: z.string(),
        userId: z.string(),
        count: z.number().gte(1),
        price: z.number().gte(1),
        isPromoted: z.boolean(),
        updatedAt: z.string(),
        createdAt: z.string(),
        city: z.string().min(3).max(50),
        condition: z.enum(['new', 'used']),
        images: z.array(z.object({ id: z.string(), img: z.string() }))
      }),
      user: z.object({
        id: z.string(),
        name: z.string().min(3).max(16),
        surname: z.string().min(3).max(20),
        img: z.string(),
        createdAt: z.string()
      })
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
    path: '/offers/follow/:id',
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
    method: 'delete',
    path: '/offers/follow/:id',
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
    method: 'get',
    path: '/offers/followed',
    requestFormat: 'json',
    response: z.object({
      data: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(8).max(50),
          description: z.string().min(50).max(1500),
          categoryId: z.string(),
          userId: z.string(),
          count: z.number().gte(1),
          price: z.number().gte(1),
          isPromoted: z.boolean(),
          updatedAt: z.string(),
          createdAt: z.string(),
          city: z.string().min(3).max(50),
          condition: z.enum(['new', 'used']),
          images: z.array(z.object({ id: z.string(), img: z.string() }))
        })
      )
    })
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
      name: z.string().min(3).max(16),
      surname: z.string().min(3).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['admin', 'user']),
      createdAt: z.string()
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
      name: z.string().min(3).max(16),
      surname: z.string().min(3).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['admin', 'user']),
      createdAt: z.string()
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
      name: z.string().min(3).max(16),
      surname: z.string().min(3).max(20),
      img: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['admin', 'user']),
      createdAt: z.string()
    })
  }
])

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not set!')
}

export const api = new Zodios(apiUrl, endpoints, {
  axiosConfig: {
    withCredentials: true
  }
})
