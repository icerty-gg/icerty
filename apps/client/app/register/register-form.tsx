"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BiLockAlt, BiMailSend, BiUser } from "react-icons/bi";
import { z } from "zod";

import { Button } from "../../components/common/Button";
import { Checkbox } from "../../components/common/Checkbox";
import { Form, useZodForm } from "../../components/common/Form";
import { Input } from "../../components/common/Input";
import { SCHEMAS, api } from "../../utils/api";
import { notify } from "../../utils/notifications";

const RegisterSchema = SCHEMAS.postApiusersregister_Body
	.extend({
		repeatPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(20, { message: "Password must be at most 20 characters long" }),
		acceptPolicy: z.literal(true, {
			invalid_type_error: "You must accept Terms and Conditions",
		}),
	})
	.superRefine(({ password, repeatPassword }, ctx) => {
		if (password !== repeatPassword) {
			ctx.addIssue({
				code: "custom",
				path: ["password", "repeatPassword"],
				message: "Passwords do not match",
			});
		}
	});

export const RegisterForm = () => {
	const router = useRouter();

	const form = useZodForm({
		schema: RegisterSchema,
	});

	const onSubmit = form.handleSubmit(async ({ email, surname, name, password }) => {
		try {
			await api.post("/api/users/register", { email, surname, name, password });

			router.push("/login");
			notify("Successfully created account!", "success");
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 409) {
				form.setError("email", {
					message: "This email is already taken",
				});
			} else {
				notify("Internal server error", "error");
			}
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit} className="grid grid-cols-2 gap-6">
			<Input
				className="max-md:col-span-2"
				icon={<BiUser className="text-lg" />}
				placeholder="First name"
				{...form.register("name")}
			/>
			<Input
				className="max-md:col-span-2"
				icon={<BiUser className="text-lg" />}
				type="text"
				placeholder="Last name"
				{...form.register("surname")}
			/>
			<Input
				className="col-span-2"
				icon={<BiMailSend className="text-lg" />}
				type="email"
				placeholder="Email"
				{...form.register("email")}
			/>
			<Input
				className="col-span-2"
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="Password"
				{...form.register("password")}
			/>
			<Input
				className="col-span-2"
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="Repeat password"
				{...form.register("repeatPassword")}
			/>
			<div className="col-span-2">
				<Checkbox {...form.register("acceptPolicy")}>I Accept the Terms of Service</Checkbox>
			</div>

			<Button className="col-span-2 text-sm">Register</Button>
		</Form>
	);
};
