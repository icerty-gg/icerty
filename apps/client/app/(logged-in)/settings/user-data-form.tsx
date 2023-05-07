// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { ZodiosBodyByPath } from "@zodios/core";
// import { isAxiosError } from "axios";
// import { BiLockAlt } from "react-icons/bi";

// import { Form, useZodForm } from "../../../components/common/form";
// import { Input } from "../../../components/common/input";
// import { DEFAULT_ERROR_MESSAGE } from "../../../components/providers";
// import { Api, SCHEMAS, api } from "../../../utils/api";
// import { notify } from "../../../utils/notifications";

// type ChanePasswordData = ZodiosBodyByPath<Api, "put", "/api/users/password">;

// export const PasswordForm = () => {
// 	const { mutateAsync: changePassword } = useMutation({
// 		mutationFn: (data: ChanePasswordData) => api.put("/api/users/password", data),
// 	});

// 	const form = useZodForm({
// 		schema: SCHEMAS.putApiuserspassword_Body,
// 	});

// 	return (
// 		<Form form={form}   className="flex flex-col gap-6">
// 			<Input
// 				icon={<BiLockAlt className="text-lg" />}
// 				type="password"
// 				placeholder="Old password"
// 				{...form.register("oldPassword")}
// 			/>
// 			<Input
// 				icon={<BiLockAlt className="text-lg" />}
// 				type="password"
// 				placeholder="New password"
// 				{...form.register("newPassword")}
// 			/>

// 			<button className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300">
// 				Change password
// 			</button>
// 		</Form>
// 	);
// };
