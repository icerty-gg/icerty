import Link from "next/link";

import { Heading } from "../../../components/common/heading";

import { RegisterForm } from "./register-form";

// #TODO Deny access for logged in users

const RegisterPage = () => {
	return (
		<div className="mx-auto flex w-full max-w-[35rem] flex-col gap-4 rounded-md bg-primaryWhite p-4">
			<Heading className="pb-6">Create an account</Heading>
			<RegisterForm />
			<div className="flex flex-col items-center gap-4 rounded-md border border-gray p-4">
				<p className="text-black">Already have an account?</p>

				<Link
					href="/login"
					className="rounded-md bg-slate-200 px-4 py-2 text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300"
				>
					Login here!
				</Link>
			</div>
		</div>
	);
};

export default RegisterPage;
