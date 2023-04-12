import clsx from "clsx";
import Link from "next/link";

import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
	readonly className?: string;
	readonly href: string;
	readonly onClick?: () => void;
}

export const PrimaryLink = ({ children, className, href, onClick }: Props) => {
	return (
		<Link
			className={clsx(
				"group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-sky-500 px-6 py-[0.6rem] text-center text-sm text-white transition-all",
				className,
			)}
			href={href}
			onClick={onClick}
		>
			{children}
			<span className="absolute h-0 w-0 translate-x-[-50%,_-50%] rounded-[50%] bg-white/20 transition-all duration-500 group-hover:h-[60rem] group-hover:w-[60rem]" />
		</Link>
	);
};
