import { Heading } from "../../../components/common/heading";
import { LoggedRoute } from "../../../components/common/logged-route";

import { EmailForm } from "./email-form";
import { PasswordForm } from "./password-form";

export const metadata = {
	title: "Settings",
};

const SettingsPage = () => {
	return (
		<LoggedRoute>
			<div className="mx-auto flex w-full max-w-[35rem] flex-col gap-4 rounded-md bg-primaryWhite p-4">
				<div className="flex gap-6">
					<div>
						<Heading className="pb-6">Change password</Heading>
						<PasswordForm />
					</div>
					<div>
						<Heading className="pb-6">Change email</Heading>
						<EmailForm />
					</div>
				</div>
			</div>
		</LoggedRoute>
	);
};

export default SettingsPage;
