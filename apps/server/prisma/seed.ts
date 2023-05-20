import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

import { hashPassword } from "../utils/password.js";

const prisma = new PrismaClient();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_SECRET) {
	throw new Error("Failed seeding db. Missing supabase credentials!");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_SECRET);

async function main() {
	await supabase.storage.emptyBucket("categories");
	await supabase.storage.emptyBucket("offers");

	await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			email: "admin@example.com",
			name: "Admin",
			surname: "Admin",
			password: await hashPassword("adminadmin"),
			role: "admin",
		},
	});

	const demoUser = await prisma.user.upsert({
		where: { email: "demouser@example.com" },
		update: {},
		create: {
			email: "demouser@example.com",
			name: "Jan",
			surname: "Kowalski",
			password: await hashPassword("useruser"),
			role: "user",
		},
	});

	const { data: footballUpload, error: footballError } = await supabase.storage
		.from("categories")
		.upload(
			randomUUID(),
			readFileSync(path.resolve(__dirname, "./seed_images/categories_football.png")),
			{
				contentType: "image/png",
			},
		);

	if (footballError) {
		throw new Error(
			"Failed seeding db. Failed uploading football category image to supabase while creating a category!",
		);
	}

	const { data: football } = supabase.storage.from("categories").getPublicUrl(footballUpload.path);

	const footballCategory = await prisma.category.upsert({
		where: { name: "Football" },
		update: {},
		create: {
			name: "Football",
			img: football.publicUrl,
		},
	});

	const { data: furnitureUpload, error: furnitureError } = await supabase.storage
		.from("categories")
		.upload(
			randomUUID(),
			readFileSync(path.resolve(__dirname, "./seed_images/categories_furniture.png")),
			{
				contentType: "image/png",
			},
		);

	if (furnitureError) {
		throw new Error(
			"Failed seeding db. Failed uploading furniture category image to supabase while creating a category!",
		);
	}

	const { data: furniture } = supabase.storage
		.from("categories")
		.getPublicUrl(furnitureUpload.path);

	const furnitureCategory = await prisma.category.upsert({
		where: { name: "Furniture" },
		update: {},
		create: {
			name: "Furniture",
			img: furniture.publicUrl,
		},
	});

	const { data: bikesUpload, error: bikesError } = await supabase.storage
		.from("categories")
		.upload(
			randomUUID(),
			readFileSync(path.resolve(__dirname, "./seed_images/categories_bikes.png")),
			{
				contentType: "image/png",
			},
		);

	if (bikesError) {
		throw new Error(
			"Failed seeding db. Failed uploading bikes category image to supabase while creating a category!",
		);
	}

	const { data: bikes } = supabase.storage.from("categories").getPublicUrl(bikesUpload.path);

	const bikeCategory = await prisma.category.upsert({
		where: { name: "Bikes" },
		update: {},
		create: {
			name: "Bikes",
			img: bikes.publicUrl,
		},
	});

	const { data: offer1Upload, error: offer1Error } = await supabase.storage
		.from("offers")
		.upload(randomUUID(), readFileSync(path.resolve(__dirname, "./seed_images/offers_bike.jpg")), {
			contentType: "image/jpeg",
		});

	if (offer1Error) {
		throw new Error(
			"Failed seeding db. Failed uploading offer 1 image to supabase while creating an offer!",
		);
	}

	const { data: offer1 } = supabase.storage.from("offers").getPublicUrl(offer1Upload.path);

	const offer1Uuid = "6a1de6ea-ece8-11ed-a05b-0242ac120003";

	await prisma.offer.upsert({
		where: { id: offer1Uuid },
		update: {},
		create: {
			id: offer1Uuid,
			city: "Warsaw",
			count: 1,
			description:
				"Bike in good condition, rarely used, about 2 years old. Price is negotiable. Delivery across Poland.",
			condition: "used",
			name: "Used mountain bike MTB 51x",
			price: 1300,
			categoryId: bikeCategory.id,
			userId: demoUser.id,
			offerImage: {
				create: {
					img: offer1.publicUrl,
				},
			},
		},
	});

	const { data: offer2Upload, error: offer2Error } = await supabase.storage
		.from("offers")
		.upload(
			randomUUID(),
			readFileSync(path.resolve(__dirname, "./seed_images/offers_football_shoes.jpg")),
			{
				contentType: "image/jpeg",
			},
		);

	if (offer2Error) {
		throw new Error(
			"Failed seeding db. Failed uploading offer 2 image to supabase while creating an offer!",
		);
	}

	const { data: offer2 } = supabase.storage.from("offers").getPublicUrl(offer2Upload.path);

	const offer2Uuid = "6a1dea96-ece8-11ed-a05b-0242ac120003";

	await prisma.offer.upsert({
		where: { id: offer2Uuid },
		update: {},
		create: {
			id: offer2Uuid,
			city: "Cracow",
			count: 1,
			description:
				"Barely used football shoes, size 42. Price is non negotiable. Played only on sundays on a grass field. There are small scratches on the front of the shoes.",
			condition: "used",
			name: "Barely new adidas football shoes",
			price: 299,
			categoryId: footballCategory.id,
			userId: demoUser.id,
			offerImage: {
				create: {
					img: offer2.publicUrl,
				},
			},
		},
	});

	const { data: offer3Upload, error: offer3Error } = await supabase.storage
		.from("offers")
		.upload(randomUUID(), readFileSync(path.resolve(__dirname, "./seed_images/offers_desk.jpg")), {
			contentType: "image/jpeg",
		});

	if (offer3Error) {
		throw new Error(
			"Failed seeding db. Failed uploading offer 3 image to supabase while creating an offer!",
		);
	}

	const { data: offer3 } = supabase.storage.from("offers").getPublicUrl(offer3Upload.path);

	const offer3Uuid = "6a1dec6c-ece8-11ed-a05b-0242ac120003";

	await prisma.offer.upsert({
		where: { id: offer3Uuid },
		update: {},
		create: {
			id: offer3Uuid,
			city: "Cracow",
			count: 1,
			description:
				"Durable desk, made of solid wood. Price is 499 with delivery costs included. The desk is 2 years old, but it is in good condition. In addition, I will add a chair for free.",
			condition: "used",
			name: "Wooden desk with a chair",
			price: 499,
			categoryId: furnitureCategory.id,
			userId: demoUser.id,
			offerImage: {
				create: {
					img: offer3.publicUrl,
				},
			},
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
