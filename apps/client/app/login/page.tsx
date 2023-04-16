"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BiLockAlt, BiMailSend } from "react-icons/bi";

import { Button, ButtonLink } from "../../components/common/Button";
import { Form, useZodForm } from "../../components/common/Form";
import { Input } from "../../components/common/Input";
import { Container } from "../../components/ui/Container";
import { Heading } from "../../components/ui/Heading";
import { Layout } from "../../components/ui/Layout";
import { SCHEMAS, api } from "../../utils/api";
import { notify } from "../../utils/notifications";

import type { Api } from "../../utils/api";
import type { ZodiosBodyByPath } from "@zodios/core";

const Login = () => {
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
			if (isAxiosError(err) && err.response?.status === 404) {
				notify("Invalid credentials", "error");
			} else {
				notify("Internal server error!", "error");
			}
		}
	});

	type User = ZodiosBodyByPath<Api, "post", "/api/sessions/login">;

	return (
		<Layout>
			<div className="m-auto grid w-full max-w-[35rem] grid-cols-1 gap-4">
				<Container>
					<Heading title="Login to your account" className="pb-6" />
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
				</Container>
				<div className="flex flex-col items-center gap-4 rounded-xl border border-slate-800 bg-gray-800/20 p-4">
					<p className="text-white">You dont have an account?</p>

					<ButtonLink href="/register" intent="secondary">
						Create new account!
					</ButtonLink>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
