import { Heading } from "../../../components/common/heading";
import { LoggedRoute } from "../../../components/common/logged-route";

import { EmailForm } from "./email-form";
import { PasswordForm } from "./password-form";
import { UserDataForm } from "./user-data-form";

export const metadata = {
	title: "Settings",
};

const SettingsPage = () => {
	return (
		<LoggedRoute>
			<div className="mx-auto flex w-full max-w-[45rem] flex-col gap-6 rounded-md bg-primaryWhite p-4">
				<Heading className="pb-6">Change password</Heading>
				<PasswordForm />
				<Heading className="pb-6">Change email</Heading>
				<EmailForm />
				<Heading className="pb-6">Other settings</Heading>
				<UserDataForm />
			</div>
		</LoggedRoute>
	);
};

export default SettingsPage;
