import supertest from "supertest";

import fastify from "../app";
import { hashPassword } from "../utils/password";

export const DEMO_USER = {
	email: "jankowalski@gmail.com",
	name: "Jan",
	surname: "Kowalski",
	password: "passwordpassword",
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

export const createUser = async ({
	name,
	surname,
	email,
	password,
	role = "user",
}: {
	name: string;
	surname: string;
	email: string;
	password: string;
	role?: "admin" | "user";
}) => {
	const hashedPassword = await hashPassword(password);

	const user = await fastify.prisma.user.create({
		data: { name, surname, email, password: hashedPassword, role },
	});

	return user;
};
