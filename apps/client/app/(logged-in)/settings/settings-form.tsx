"use client";

import { useMutation } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { isAxiosError } from "axios";
import { BiLockAlt } from "react-icons/bi";

import { DEFAULT_ERROR_MESSAGE } from "../../../components/Providers";
import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { Api, SCHEMAS, api } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

type ChanePasswordData = ZodiosBodyByPath<Api, "put", "/api/users/password">;

export const SettingsForm = () => {
	const { mutateAsync: changePassword } = useMutation({
		mutationFn: (data: ChanePasswordData) => api.put("/api/users/password", data),
	});

	const changePasswordForm = useZodForm({
		schema: SCHEMAS.putApiuserspassword_Body,
	});

	const changePasswordOnSubmit = changePasswordForm.handleSubmit(async (data) => {
		try {
			await changePassword(data);
			changePasswordForm.reset();
			notify("Successfully changed password", "success");
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 409) {
				changePasswordForm.setError("oldPassword", {
					message: "Old password is incorrect",
				});
			} else {
				notify(DEFAULT_ERROR_MESSAGE, "error");
			}
		}
	});

	return (
		<Form
			form={changePasswordForm}
			onSubmit={changePasswordOnSubmit}
			className="flex flex-col gap-6"
		>
			<Input
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="Old password"
				{...changePasswordForm.register("oldPassword")}
			/>
			<Input
				icon={<BiLockAlt className="text-lg" />}
				type="password"
				placeholder="New password"
				{...changePasswordForm.register("newPassword")}
			/>

			<button className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300">
				Change password
			</button>
		</Form>
	);
};
