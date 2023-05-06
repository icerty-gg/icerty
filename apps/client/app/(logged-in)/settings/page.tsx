import { Heading } from "../../../components/common/heading";
import { LoggedRoute } from "../../../components/common/logged-route";

import { SettingsForm } from "./settings-form";

const SettingsPage = () => {
	return (
		<LoggedRoute>
			<div className="mx-auto flex w-full max-w-[35rem] flex-col gap-4 rounded-md bg-primaryWhite p-4">
				<Heading className="pb-6">Change password</Heading>
				<SettingsForm />
			</div>
		</LoggedRoute>
	);
};

export default SettingsPage;
