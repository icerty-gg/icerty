import cron from 'node-cron'

import { prisma } from './prisma'

export const clearTokens = () => {
  cron.schedule('* * 1 * * *', async () => {
    await prisma.auth_tokens.deleteMany({
      where: {
        expiration_date: {
          lt: new Date()
        }
      }
    })
  })
}
