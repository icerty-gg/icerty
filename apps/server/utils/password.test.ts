import { describe, expect, it } from "vitest";

import { comparePasswords, hashPassword } from "./password";

describe("Tests password utils", () => {
	it("Should hash a password", async () => {
		const hashedPassword = await hashPassword("password");
		expect(hashedPassword).not.toEqual("password");
	});

	it("Should compare a hashed password", async () => {
		const hashedPassword = await hashPassword("password");
		const isEqual = await comparePasswords("password", hashedPassword);
		expect(isEqual).toEqual(true);
	});
});
