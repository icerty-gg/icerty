"use client";

import { twMerge } from "tailwind-merge";

import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
	readonly className?: string;
	readonly onClick?: () => void;
}

export const PrimaryButton = ({ children, className, onClick }: Props) => {
	return (
		<button
			className={twMerge(
				"group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-sky-500 px-6 py-[0.6rem] text-center text-sm text-white",
				className,
			)}
			type="submit"
			onClick={onClick}
		>
			{children}
			<span className="absolute h-0 w-0 translate-x-[-50%,_-50%] rounded-[50%] bg-white/20 transition-all duration-500 group-hover:h-[60rem] group-hover:w-[60rem]" />
		</button>
	);
};
