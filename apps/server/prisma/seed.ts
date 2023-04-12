import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			email: "admin@example.com",
			name: "Admin",
			password: "$2a$10$02vAXeqFIihjJCXb0w.WD.0UQPJa8YwWjX6Jkw8JYsVwvX0AffVFW",
			role: "admin",
			surname: "Admin",
		},
	});

	await prisma.category.upsert({
		where: { name: "Furniture" },
		update: {},
		create: {
			name: "Furniture",
			img: "https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/categories/Meble.jpg",
		},
	});

	await prisma.offer.upsert({
		where: { id: "c40241d0-2b72-4fd2-b6ba-be34ad5dbae7" },
		update: {},
		create: {
			id: "c40241d0-2b72-4fd2-b6ba-be34ad5dbae7",
			name: "Brand new wooden desk cheap!",
			offerImage: {
				createMany: {
					data: [
						{
							img: "https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/drewniane-biurko-7824.jpg",
						},
						{
							img: "https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/BIURKO_SIMONA_II-1.jpg",
						},
					],
				},
			},
			city: "Warsaw",
			description:
				"Brand new wooden desk cheap! Everything is included in the price. Delivery is possible. Used for 2 months. I am selling because I am moving to a smaller apartment.",
			condition: "used",
			count: 1,
			price: 100,
			categoryId: "c4a6c75d-948b-4feb-9950-09ffa256eb9c",
			userId: "1cd5d746-8c35-45fa-bd89-8081db784f58",
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
