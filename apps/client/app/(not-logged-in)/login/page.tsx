import Link from "next/link";

import { Heading } from "../../../components/common/heading";
import { UnloggedRoute } from "../../../components/common/unlogged-route";

import { LoginForm } from "./login-form";

const LoginPage = () => {
	return (
		<UnloggedRoute>
			<div className="mx-auto flex w-full max-w-[35rem] flex-col gap-4 rounded-md bg-primaryWhite p-4">
				<Heading className="pb-6">Login to your account</Heading>
				<LoginForm />
				<div className="flex flex-col items-center gap-4 rounded-md border border-gray p-4">
					<p className="text-black">Don't you have an account?</p>

					<Link
						href="/register"
						className="rounded-md bg-slate-200 px-4 py-2 text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300"
					>
						Create one here!
					</Link>
				</div>
			</div>
		</UnloggedRoute>
	);
};

export default LoginPage;
