"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLockAlt, BiMailSend, BiUser } from "react-icons/bi";
import { z } from "zod";

import { CheckboxInput } from "../../components/Form/checkbox-input/CheckboxInput";
import { Input } from "../../components/Form/input/Input";
import { Button, ButtonLink } from "../../components/common/Button";
import { Container } from "../../components/ui/Container";
import { Heading } from "../../components/ui/Heading";
import { Layout } from "../../components/ui/Layout";
import { useUser } from "../../hooks/useUser";
import { api } from "../../utils/api";
import { notify } from "../../utils/notifications";

import type { SubmitHandler } from "react-hook-form";

const RegisterSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: "Name must be at least 8 characters long" })
			.max(16, { message: "Name must be at most 20 characters long" }),
		surname: z
			.string()
			.min(3, { message: "Surname must be at least 8 characters long" })
			.max(20, { message: "Surname must be at most 20 characters long" }),
		email: z.string().email(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(20, { message: "Password must be at most 20 characters long" }),
		repeatPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(20, { message: "Password must be at most 20 characters long" }),
		acceptPolicy: z.literal(true, {
			invalid_type_error: "You must accept Terms and Conditions",
		}),
	})
	.superRefine(({ password, repeatPassword }, ctx) => {
		if (password !== repeatPassword) {
			ctx.addIssue({
				code: "custom",
				path: ["password", "repeatPassword"],
				message: "Passwords do not match",
			});
		}
	});

type FormSchemaType = z.infer<typeof RegisterSchema>;

const Register = () => {
	const router = useRouter();
	const { user } = useUser();

	useEffect(() => {
		if (user) router.push("/");
	}, [router, user]);

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<FormSchemaType>({
		resolver: zodResolver(RegisterSchema),
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async ({ email, name, password, surname }) => {
		try {
			await api.post("/api/users/register", { email, surname, name, password });
			console.log({ email, surname, name, password });

			router.push("/login");
			notify("Successfully created account!", "success");
		} catch (err) {
			notify("Account is already exists!", "error");
		}
	};

	return (
		<Layout>
			<div className="m-auto grid w-full max-w-[46rem] grid-cols-1 gap-4">
				<Container>
					<Heading className="pb-6">Create Account</Heading>

					<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
						<Input
							className="max-md:col-span-2"
							icon={<BiUser className="text-lg" />}
							type="text"
							placeholder="First name"
							errorMessage={errors.name?.message}
							{...register("name")}
						/>
						<Input
							className="max-md:col-span-2"
							icon={<BiUser className="text-lg" />}
							type="text"
							placeholder="Last name"
							errorMessage={errors.surname?.message}
							{...register("surname")}
						/>
						<Input
							className="col-span-2"
							icon={<BiMailSend className="text-lg" />}
							type="email"
							placeholder="Email"
							errorMessage={errors.email?.message}
							{...register("email")}
						/>
						<Input
							className="col-span-2"
							icon={<BiLockAlt className="text-lg" />}
							type="password"
							placeholder="Password"
							errorMessage={errors.password?.message}
							{...register("password")}
						/>
						<Input
							className="col-span-2"
							icon={<BiLockAlt className="text-lg" />}
							type="password"
							placeholder="Repeat password"
							errorMessage={errors.repeatPassword?.message}
							{...register("repeatPassword")}
						/>
						<div className="col-span-2">
							<CheckboxInput
								errorMessage={errors.acceptPolicy?.message}
								{...register("acceptPolicy")}
							>
								I Accept the Terms of Service
							</CheckboxInput>
						</div>

						<Button className="col-span-2 text-sm">Register</Button>
					</form>
				</Container>
				<div className="flex flex-col items-center gap-4 rounded-xl border border-slate-800 bg-gray-800/20 p-4">
					<p className="text-white">Already have an account?</p>

					<ButtonLink intent="secondary" href="/login">
						Login to your account!
					</ButtonLink>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
