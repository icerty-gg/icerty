"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { useCheckScroll } from "../../hooks/useCheckScroll";

import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
	readonly href: string;
}

export const NavLink = ({ children, href }: Props) => {
	const pathname = usePathname();
	const isSmallerNavbar = useCheckScroll(80);

	return (
		<Link
			className={twMerge(
				"relative z-20 flex h-full flex-col items-center gap-[0.2rem] p-4 text-xl transition-all duration-300 hover:text-sky-500",
				pathname === href ? "text-sky-500" : "text-slate-200",
				isSmallerNavbar && "pb-0 pt-[22px]",
			)}
			href={href}
		>
			{children}
		</Link>
	);
};
