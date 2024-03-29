import { Heading } from "../../../components/common/heading";

import { EmailForm } from "./email-form";
import { PasswordForm } from "./password-form";
import { UserDataForm } from "./user-data-form";

export const metadata = {
	title: "Settings",
};

const SettingsPage = () => {
	return (
		<div className="mx-auto flex w-full max-w-[45rem] flex-col gap-6 rounded-md bg-primaryWhite p-4">
			<Heading>Change password</Heading>
			<PasswordForm />
			<Heading>Change email</Heading>
			<EmailForm />
			<Heading>Other settings</Heading>
			<UserDataForm />
		</div>
	);
};

export default SettingsPage;
