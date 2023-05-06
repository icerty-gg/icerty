import { ButtonLink } from "../../components/common/Button";
import { Container } from "../../components/ui/Container";
import { Heading } from "../../components/ui/Heading";

import { RegisterForm } from "./register-form";

// #TODO Deny access for logged in users

const RegisterPage = () => {
	return (
		<div className="m-auto grid w-full max-w-[46rem] grid-cols-1 gap-4">
			<Container>
				<Heading className="pb-6">Create Account</Heading>
				<RegisterForm />
			</Container>
			<div className="flex flex-col items-center gap-4 rounded-xl border border-slate-800 bg-gray-800/20 p-4">
				<p className="text-white">Already have an account?</p>

				<ButtonLink intent="secondary" href="/login">
					Login to your account!
				</ButtonLink>
			</div>
		</div>
	);
};

export default RegisterPage;
