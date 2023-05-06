"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BiLockAlt, BiMailSend } from "react-icons/bi";

import { Button } from "../../components/common/Button";
import { Form, useZodForm } from "../../components/common/Form";
import { Input } from "../../components/common/Input";
import { SCHEMAS, api } from "../../utils/api";
import { notify } from "../../utils/notifications";

import type { Api } from "../../utils/api";
import type { ZodiosBodyByPath } from "@zodios/core";

type User = ZodiosBodyByPath<Api, "post", "/api/sessions/login">;

export const LoginForm = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutateAsync: login } = useMutation({
		mutationFn: (data: User) => api.post("/api/sessions/login", data),
	});

	const form = useZodForm({
		schema: SCHEMAS.postApisessionslogin_Body,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			await login(data);

			router.push("/");
			queryClient.setQueryData(["user"], data);
			notify("Successfully logged in", "success");
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 401) {
				form.setError("email", {
					message: "Invalid email or password",
				});
				form.setError("password", {
					message: "Invalid email or password",
				});
			} else {
				notify("Internal server error!", "error");
			}
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
			<Input
				icon={<BiMailSend className="text-lg" />}
				type="email"
				placeholder="Email"
				{...form.register("email")}
			/>
			<Input
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="Password"
				{...form.register("password")}
			/>
			<Button className="text-sm" intent="secondary">
				Login
			</Button>
		</Form>
	);
};
