"use client";

import { BiLockAlt } from "react-icons/bi";
import { z } from "zod";

import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { useUserCtx } from "../../../components/common/logged-route";
import { useDeleteMyAccount } from "../../../hooks/user-hooks";

export const UserDataForm = () => {
	const user = useUserCtx();
	const deleteMyAccount = useDeleteMyAccount();

	const form = useZodForm({
		schema: z.object({
			name: z.string(),
			surname: z.string(),
			createdAt: z.string(),
		}),
		defaultValues: {
			name: user.name,
			surname: user.surname,
			createdAt: new Date(user.createdAt).toUTCString(),
		},
	});

	return (
		<>
			<Form form={form} manuallyDisabled className="flex flex-col gap-6">
				<Input label="Name" icon={<BiLockAlt className="text-lg" />} {...form.register("name")} />
				<Input
					label="Surname"
					icon={<BiLockAlt className="text-lg" />}
					{...form.register("surname")}
				/>
				<Input
					label="Created at"
					icon={<BiLockAlt className="text-lg" />}
					{...form.register("createdAt")}
				/>
			</Form>

			<button
				className="rounded-md bg-red-400 px-4 py-2 font-medium text-white outline-none transition-colors hover:bg-red-500 focus:bg-red-500"
				onClick={() => deleteMyAccount()}
			>
				Delete my account
			</button>
		</>
	);
};
