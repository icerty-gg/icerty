"use client";

import { isAxiosError } from "axios";
import { BiLockAlt, BiMailSend } from "react-icons/bi";

import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { DEFAULT_ERROR_MESSAGE } from "../../../components/providers";
import { useLogin } from "../../../hooks/user-hooks";
import { SCHEMAS } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

export const LoginForm = () => {
	const login = useLogin();
	const form = useZodForm({
		schema: SCHEMAS.postApisessionslogin_Body,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			await login(data);
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 401) {
				form.setError("email", {
					message: "Invalid email or password",
				});
				form.setError("password", {
					message: "Invalid email or password",
				});
			} else {
				notify(DEFAULT_ERROR_MESSAGE, "error");
			}
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
			<Input
				label="Email"
				icon={<BiMailSend className="text-lg" />}
				type="email"
				placeholder="Email"
				{...form.register("email")}
			/>
			<Input
				label="Password"
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="Password"
				{...form.register("password")}
			/>
			<button className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300">
				Login
			</button>
		</Form>
	);
};
