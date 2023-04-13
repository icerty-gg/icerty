import { twMerge } from "tailwind-merge";

import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
	readonly className?: string;
	readonly onClick?: () => void;
}

export const SecondaryButton = ({ children, className, onClick }: Props) => {
	return (
		<button
			className={twMerge(
				"rounded-full border border-slate-800 bg-sky-400/10 px-10  py-[0.6rem] text-center text-sm text-sky-600 transition-all hover:border-sky-500 hover:bg-sky-400/20",
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
