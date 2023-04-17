import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 10);
};

export const comparePasswords = (password: string, userPassword: string) => {
	return bcrypt.compare(password, userPassword);
};
