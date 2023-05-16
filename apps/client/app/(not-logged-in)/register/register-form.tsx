"use client";

import { useMutation } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BiLockAlt, BiMailSend, BiUser } from "react-icons/bi";
import { z } from "zod";

import { Checkbox } from "../../../components/common/checkbox";
import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { DEFAULT_ERROR_MESSAGE } from "../../../components/providers";
import { Api, SCHEMAS, api } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

const RegisterSchema = SCHEMAS.postApiusersregister_Body
	.extend({
		repeatPassword: z.string().min(8).max(20),
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

type RegisterData = ZodiosBodyByPath<Api, "post", "/api/users/register">;

export const RegisterForm = () => {
	const router = useRouter();
	const { mutateAsync: register } = useMutation({
		mutationFn: (data: RegisterData) => api.post("/api/users/register", data),
	});
	const form = useZodForm({
		schema: RegisterSchema,
	});

	const onSubmit = form.handleSubmit(async ({ email, surname, name, password }) => {
		try {
			await register({ email, surname, name, password });

			router.push("/login");
			notify("Successfully created account!", "success");
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 409) {
				form.setError("email", {
					message: "This email is already taken",
				});
			} else {
				notify(DEFAULT_ERROR_MESSAGE, "error");
			}
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit} className="grid grid-cols-2 gap-6">
			<Input
				label="First name"
				className="max-md:col-span-2"
				icon={<BiUser className="text-lg text-gray" />}
				placeholder="First name"
				{...form.register("name")}
			/>
			<Input
				label="Last name"
				className="max-md:col-span-2"
				icon={<BiUser className="text-lg text-gray" />}
				type="text"
				placeholder="Last name"
				{...form.register("surname")}
			/>
			<Input
				label="Email"
				className="col-span-2"
				icon={<BiMailSend className="text-lg text-gray" />}
				type="email"
				placeholder="Email"
				{...form.register("email")}
			/>
			<Input
				label="Password"
				className="col-span-2"
				icon={<BiLockAlt className="text-lg text-gray" />}
				type="password"
				placeholder="Password"
				{...form.register("password")}
			/>
			<Input
				label="Repeat password"
				className="col-span-2"
				icon={<BiLockAlt className="text-lg text-gray" />}
				type="password"
				placeholder="Repeat password"
				{...form.register("repeatPassword")}
			/>
			<div className="col-span-2">
				<Checkbox {...form.register("acceptPolicy")}>I Accept the Terms of Service</Checkbox>
			</div>

			<button className="col-span-2 rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300">
				Register
			</button>
		</Form>
	);
};
