import cron from 'node-cron'

import { prisma } from './prisma'

export const clearTokens = () => {
  cron.schedule('* * 3 * * *', async () => {
    console.log('Run')

    await prisma.auth_tokens.deleteMany({
      where: {
        expiration_date: {
          lt: new Date()
        }
      }
    })
  })
}
