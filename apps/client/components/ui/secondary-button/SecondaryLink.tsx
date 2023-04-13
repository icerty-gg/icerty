import Link from "next/link";
import { twMerge } from "tailwind-merge";

import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
	readonly className?: string;
	readonly href: string;
}

export const SecondaryLink = ({ children, className, href }: Props) => {
	return (
		<Link
			className={twMerge(
				"rounded-full border border-slate-800 bg-sky-400/10 px-10  py-[0.6rem] text-center text-sm text-sky-600 transition-all hover:border-sky-500 hover:bg-sky-400/20",
				className,
			)}
			href={href}
		>
			{children}
		</Link>
	);
};
