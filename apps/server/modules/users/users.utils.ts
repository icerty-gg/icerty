import fastify from "../../app.js";
import { hashPassword } from "../../utils/password.js";

export const createUser = async ({
	name,
	surname,
	email,
	password,
}: {
	name: string;
	surname: string;
	email: string;
	password: string;
}) => {
	const hashedPassword = await hashPassword(password);

	const user = await fastify.prisma.user.create({
		data: { name, surname, email, password: hashedPassword },
	});

	return user;
};
