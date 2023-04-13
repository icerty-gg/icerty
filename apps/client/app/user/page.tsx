"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { UserLinksData } from "../../components/navbar/Navbar";
import { Container } from "../../components/ui/Container";
import { useUser } from "../../hooks/useUser";

import { Lists } from "./tabs/Lists";

// export const metadata: Metadata = {
// 	title: "User",
// };

const User = () => {
	const { user } = useUser();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const tabSearchParams = searchParams.get("tab");

	useEffect(() => {
		if (!tabSearchParams) router.push("/user?tab=account");

		if (!user) router.push("/");
	}, [tabSearchParams, router, user]);

	return (
		<div className="grid grid-cols-[1fr,_2fr] gap-4">
			<div className="relative h-full w-full">
				<Container className="sticky left-0 top-[6rem] flex flex-col">
					<ul className="flex flex-col">
						{UserLinksData.map((l) => {
							return (
								<li key={l.title}>
									<Link
										className={twMerge(
											"flex items-center gap-4 rounded-full p-2 text-sm text-white hover:bg-gray-800/40",
											`${pathname}?tab=${tabSearchParams}` === l.href && "bg-gray-800/40",
										)}
										href={l.href}
									>
										{l.icon} {l.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</Container>
			</div>

			<Container>
				{tabSearchParams === "account" && <p>Account</p>}
				{tabSearchParams === "lists" && <Lists />}
				{tabSearchParams === "offers" && <p>Offers</p>}
				{tabSearchParams === "opinions" && <p>Opinions</p>}
			</Container>
		</div>
	);
};

export default User;
