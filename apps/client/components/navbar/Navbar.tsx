"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
	CiHeart,
	CiDollar,
	CiHome,
	CiMedicalCross,
	CiUser,
	CiLogout,
	CiLogin,
	CiStar,
} from "react-icons/ci";
import { twMerge } from "tailwind-merge";

import { useCheckScroll } from "../../hooks/useCheckScroll";
import { useUser } from "../../hooks/useUser";
import Logotype from "../../public/logo.svg";
import { api } from "../../utils/fetcher";
import { notify } from "../../utils/notifications";
import { ButtonLink } from "../common/Button";
import { LoadingSpinner } from "../ui/LoadingSpinner";

import { NavLink } from "./NavLink";

import type { ReactNode } from "react";

interface NavbarLinkProps {
	readonly href: string;
	readonly icon: ReactNode;
	readonly isSmallerNavbar: boolean;
	readonly title: string;
}

const NavbarLinksData = [
	{
		title: "Home",
		href: "/",
		icon: <CiHome className="text-2xl" />,
	},
	{
		title: "Offers",
		href: "/offers",
		icon: <CiDollar className="text-2xl" />,
	},
	{
		title: "Lists",
		href: "/user?tab=lists",
		icon: <CiHeart className="text-2xl" />,
	},
	{
		title: "Add offer",
		href: "/add-offer",
		icon: <CiMedicalCross className="text-2xl" />,
	},
];

export const UserLinksData = [
	{
		title: "Your account",
		href: "/user?tab=account",
		icon: <CiUser className="text-2xl" />,
	},
	{
		title: "Your offers",
		href: "/user?tab=offers",
		icon: <CiDollar className="text-2xl" />,
	},
	{
		title: "Your lists",
		href: "/user?tab=lists",
		icon: <CiHeart className="text-2xl" />,
	},
	{
		title: "Your opinions",
		href: "/user?tab=opinions",
		icon: <CiStar className="text-2xl" />,
	},
];

const NavbarLink = ({ href, icon, isSmallerNavbar, title }: NavbarLinkProps) => {
	return (
		<NavLink href={href}>
			{icon}

			<p
				className={twMerge(
					"text-xs transition-all",
					isSmallerNavbar && "invisible translate-y-[-0.5rem] opacity-0",
				)}
			>
				{title}
			</p>
		</NavLink>
	);
};

export const Navbar = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { isLoading, user } = useUser();
	const isSmallerNavbar = useCheckScroll(80);
	const navbarRef = useRef<HTMLElement | null>(null);

	const { isLoading: logoutLoading, mutate: logout } = useMutation({
		mutationFn: () => api.post("/api/sessions/logout", undefined),
		onSuccess: () => {
			router.push("/");
			queryClient.setQueryData(["user"], null);
			notify("Successfully logout", "success");
		},
		onError: () => {
			notify("Error", "error");
		},
	});

	return (
		<>
			<nav
				ref={navbarRef}
				className={twMerge(
					"supports-backdrop-blur:bg-white/95 fixed z-30 flex h-20 w-full items-center border-b border-slate-300/10 bg-gray-900/90 text-center backdrop-blur transition-all duration-300",
					isSmallerNavbar && "h-16",
				)}
			>
				<div
					className={twMerge(
						"mx-auto my-0 flex w-full max-w-screen-2xl flex-wrap items-center justify-between px-8 transition-all max-lg:justify-center",
					)}
				>
					<Link
						className={twMerge(
							"flex items-center gap-4 text-xl font-bold text-white max-lg:hidden",
						)}
						href="/"
					>
						<Logotype className={twMerge("w-10 transition-all")} />
						<h1 className={twMerge("transition-opacity", isSmallerNavbar && "opacity-0")}>
							Icerty
						</h1>
					</Link>
					<div className="flex items-center">
						{NavbarLinksData.map((l) => {
							return <NavbarLink key={l.title} {...l} isSmallerNavbar={isSmallerNavbar} />;
						})}
					</div>

					{!isLoading ? (
						user ? (
							<div className="group relative ml-4 rounded-lg rounded-b-none border border-b-0 border-transparent hover:border-slate-300/10 hover:bg-gray-900">
								<NavLink href="/user?tab=account">
									<CiUser className="text-2xl" />

									<p
										className={twMerge(
											"text-xs transition-all",
											isSmallerNavbar && "invisible translate-y-[-0.5rem] opacity-0",
										)}
									>
										Account
									</p>
								</NavLink>

								<div className="invisible absolute right-0 top-[98%] -z-10 flex w-[20rem] flex-col gap-4 rounded-lg rounded-tr-none border border-slate-300/10 bg-gray-900 p-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
									<div className="flex items-center gap-4">
										<Image
											src={user.img}
											alt={user.name}
											width={40}
											height={40}
											className="rounded-[50%]"
										/>
										<div className="flex flex-col items-start">
											<p className="text-gray-500">Hello</p>
											<p className="text-xl text-white first-letter:uppercase">{user.name}</p>
										</div>
									</div>

									<div className="flex items-center justify-center gap-2 text-white">
										<div className="h-[1px] w-full max-w-[2rem] bg-gray-700" />
										<p>Account</p>
										<div className="h-[1px] w-full max-w-[2rem] bg-gray-700" />
									</div>

									<ul className="grid grid-cols-1">
										{UserLinksData.map((l) => {
											return (
												<li key={l.title}>
													<Link
														className="flex items-center gap-4 rounded-full p-2 text-sm text-white hover:bg-gray-800/40"
														href={l.href}
													>
														{l.icon} {l.title}
													</Link>
												</li>
											);
										})}
									</ul>
									<div className="flex items-center justify-center gap-2 text-white">
										<div className="h-[1px] w-full max-w-[2rem] bg-gray-700" />
										<p>or</p>
										<div className="h-[1px] w-full max-w-[2rem] bg-gray-700" />
									</div>
									<button
										onClick={() => logout()}
										className={twMerge(
											"flex items-center justify-center gap-2 rounded-full border border-slate-800 bg-sky-400/10 px-10  py-[0.5rem] text-center text-sm text-sky-600 transition-all hover:border-sky-500 hover:bg-sky-400/20",
										)}
									>
										{logoutLoading ? (
											<LoadingSpinner size="w-[18px] h-[18px]" />
										) : (
											<>
												<CiLogout className="text-xl" /> <span>Logout</span>
											</>
										)}
									</button>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-3 text-sm">
								<ButtonLink href="/login">
									<CiLogin className="text-xl" /> <p className="max-lg:hidden">Login</p>
								</ButtonLink>
							</div>
						)
					) : (
						<LoadingSpinner size="w-8 h-8" />
					)}
				</div>
			</nav>
		</>
	);
};
