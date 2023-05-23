import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import path from "path";

import supertest from "supertest";

import fastify from "../app";
import { hashPassword } from "../utils/password";

const footballCategoryImage = readFileSync(
	path.resolve(__dirname, "../prisma/seed_images/categories_football.png"),
);

const { data, error } = await fastify.supabase.storage
	.from("categories")
	.upload(randomUUID(), footballCategoryImage, {
		contentType: "image/png",
	});

if (error) {
	throw new Error(error.message);
}

const { data: url } = fastify.supabase.storage.from("categories").getPublicUrl(data.path);

export const DEMO_CATEGORY = {
	name: "Football",
	img: url.publicUrl,
};

export const createDemoCategory = async (name = DEMO_CATEGORY.name) => {
	const category = await fastify.prisma.category.create({
		data: {
			name: name,
			img: DEMO_CATEGORY.img,
		},
	});

	return category;
};

export const DEMO_ADMIN = {
	email: "admin@gmail.com",
	name: "Admin",
	surname: "AdminAdmin",
	password: "adminpassword123",
	role: "admin",
} as const;

export const createDemoAdminUser = async () => {
	const user = await fastify.prisma.user.create({
		data: {
			name: DEMO_ADMIN.name,
			surname: DEMO_ADMIN.surname,
			email: DEMO_ADMIN.email,
			password: await hashPassword(DEMO_ADMIN.password),
			role: DEMO_ADMIN.role,
		},
	});

	return user;
};

export const DEMO_USER = {
	email: "jankowalski@gmail.com",
	name: "Jan",
	surname: "Kowalski",
	password: "userpassword123",
	role: "user",
} as const;

export const createDemoUser = async () => {
	const user = await fastify.prisma.user.create({
		data: {
			name: DEMO_USER.name,
			surname: DEMO_USER.surname,
			email: DEMO_USER.email,
			password: await hashPassword(DEMO_USER.password),
			role: DEMO_USER.role,
		},
	});

	return user;
};

export const DEMO_OFFER = {
	name: "Football shoes",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	count: 1,
	price: 100,
	condition: "new",
	city: "Warsaw",
};

export const createDemoOffer = async () => {
	const category = await createDemoCategory();
	const user = await createDemoUser();

	const offerId = randomUUID();

	const footballOfferImage = readFileSync(
		path.resolve(__dirname, "../prisma/seed_images/offers_football_shoes.jpg"),
	);

	const { data, error } = await fastify.supabase.storage
		.from("offers")
		.upload(`${offerId}/${randomUUID()}`, footballOfferImage, {
			contentType: "image/jpeg",
		});

	if (error) {
		throw new Error(error.message);
	}

	const { data: url } = fastify.supabase.storage.from("offers").getPublicUrl(data.path);

	const offer = await fastify.prisma.offer.create({
		data: {
			name: "Football shoes",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			count: 1,
			price: 100,
			condition: "new",
			city: "Warsaw",
			categoryId: category.id,
			userId: user.id,
			offerImage: {
				createMany: {
					data: [{ img: url.publicUrl }],
				},
			},
		},
	});

	return { offer, category, user };
};

export const logInAndReturnCookie = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const res = await supertest(fastify.server).post("/api/sessions/login").send({ email, password });

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
	const cookie = [...res.header["set-cookie"]];

	return cookie as string[];
};
