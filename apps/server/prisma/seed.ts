import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: '$2a$10$Hg15umuK5xrHsD6KoTxh.uX5qQmyXJslrEnA9S0shpxOhVprUWfGm',
      role: 'admin',
      surname: 'Admin'
    }
  })

  await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: {
      name: 'Furniture',
      img: 'https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/categories/Meble.jpg'
    }
  })

  await prisma.offer.upsert({
    where: { name: 'Brand new wooden desk cheap!' },
    update: {},
    create: {
      name: 'Brand new wooden desk cheap!',
      offerImage: {
        createMany: {
          data: [
            {
              img: 'https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/drewniane-biurko-7824.jpg'
            },
            {
              img: 'https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/BIURKO_SIMONA_II-1.jpg'
            }
          ]
        }
      },
      city: 'Warsaw',
      description:
        'Brand new wooden desk cheap! Everything is included in the price. Delivery is possible. Used for 2 months. I am selling because I am moving to a smaller apartment.',
      condition: 'used',
      count: 1,
      price: 100,
      categoryId: '308afac0-0598-4618-a505-678e5d9cf9f2',
      userId: '6e94bcde-c2d5-4ec3-af2b-66d9e03d90a5'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
