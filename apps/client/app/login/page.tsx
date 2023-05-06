import { ButtonLink } from "../../components/common/Button";
import { Container } from "../../components/ui/Container";
import { Heading } from "../../components/ui/Heading";
import { Layout } from "../../components/ui/Layout";

import { LoginForm } from "./login-form";

const Login = () => {
	return (
		<Layout>
			<div className="m-auto grid w-full max-w-[35rem] grid-cols-1 gap-4">
				<Container>
					<Heading className="pb-6">Login to your account</Heading>
					<LoginForm />
				</Container>
				<div className="flex flex-col items-center gap-4 rounded-xl border border-slate-800 bg-gray-800/20 p-4">
					<p className="text-white">You don't have an account?</p>

					<ButtonLink href="/register" intent="secondary">
						Create new account!
					</ButtonLink>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
