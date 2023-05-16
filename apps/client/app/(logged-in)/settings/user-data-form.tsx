"use client";

import { BiLockAlt } from "react-icons/bi";

import { Input } from "../../../components/common/input";
import { useUserCtx } from "../../../components/common/logged-route";
import { useDeleteMyAccount } from "../../../hooks/user-hooks";

export const UserDataForm = () => {
	const user = useUserCtx();
	const deleteMyAccount = useDeleteMyAccount();

	return (
		<>
			<div className="flex flex-col gap-6">
				<Input
					label="Name"
					icon={<BiLockAlt className="text-lg text-gray" />}
					name="Name"
					withFormCtx={false}
					disabled
					defaultValue={user.name}
				/>
				<Input
					label="Surname"
					icon={<BiLockAlt className="text-lg text-gray" />}
					name="Surname"
					withFormCtx={false}
					disabled
					defaultValue={user.surname}
				/>
				<Input
					label="Created at"
					icon={<BiLockAlt className="text-lg text-gray" />}
					name="Created at"
					withFormCtx={false}
					disabled
					defaultValue={new Date(user.createdAt).toUTCString()}
				/>
			</div>

			<button
				className="rounded-md bg-red-400 px-4 py-2 font-medium text-white outline-none transition-colors hover:bg-red-500 focus:bg-red-500"
				onClick={() => deleteMyAccount()}
			>
				Delete my account
			</button>
		</>
	);
};
