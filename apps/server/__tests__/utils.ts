import supertest from "supertest";

import fastify from "../app";
import { hashPassword } from "../utils/password";

export const DEMO_CATEGORY = {
	name: "Football",
	img: "Football.png",
};

export const createDemoCategory = async () => {
	const category = await fastify.prisma.category.create({
		data: {
			name: DEMO_CATEGORY.name,
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
		},
	});

	return offer;
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
