"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { BiMailSend } from "react-icons/bi";
import { z } from "zod";

import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { useUserCtx } from "../../../components/common/logged-route";
import { DEFAULT_ERROR_MESSAGE } from "../../../components/providers";
import { USER_QUERY_KEY } from "../../../hooks/user-hooks";
import { Api, api } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

type ChangeEmailData = ZodiosBodyByPath<Api, "put", "/api/users/email">;

export const EmailForm = () => {
	const user = useUserCtx();
	const queryClient = useQueryClient();
	const { mutateAsync: changeEmail } = useMutation({
		mutationFn: (data: ChangeEmailData) => api.put("/api/users/email", data),
	});

	// TODO: openapi-zod-client doesn't generate SCHEMA for a single z.object body - find a way to fix it
	// rn schema is created manually
	const form = useZodForm({
		schema: z.object({ email: z.string().email() }),
		defaultValues: {
			email: user.email,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			await changeEmail(data);
			await queryClient.invalidateQueries([USER_QUERY_KEY]);
			notify("Successfully changed email", "success");
		} catch (err) {
			notify(DEFAULT_ERROR_MESSAGE, "error");
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
			<Input
				label="Email"
				icon={<BiMailSend className="text-lg text-gray" />}
				type="email"
				placeholder="Email"
				{...form.register("email")}
			/>

			<button className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300">
				Change email
			</button>
		</Form>
	);
};
