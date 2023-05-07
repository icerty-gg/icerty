"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiLockAlt } from "react-icons/bi";
import { z } from "zod";

import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { useUserCtx } from "../../../components/common/logged-route";
import { USER_QUERY_KEY } from "../../../hooks/user-hooks";
import { api } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

export const UserDataForm = () => {
	const user = useUserCtx();
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: deleteMyAccount } = useMutation({
		mutationFn: () => api.delete("/api/users/me", undefined),
		onSuccess: () => {
			queryClient.setQueryData([USER_QUERY_KEY], null);
			notify("Account deleted", "success");
			router.push("/");
		},
	});

	const form = useZodForm({
		schema: z.object({
			name: z.string(),
			surname: z.string(),
			createdAt: z.string(),
		}),
		defaultValues: {
			name: user.name,
			surname: user.surname,
			createdAt: user.createdAt,
		},
	});

	return (
		<>
			<Form form={form} manuallyDisabled className="flex flex-col gap-6">
				<Input icon={<BiLockAlt className="text-lg" />} {...form.register("name")} />
				<Input icon={<BiLockAlt className="text-lg" />} {...form.register("surname")} />
				<Input icon={<BiLockAlt className="text-lg" />} {...form.register("createdAt")} />
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
