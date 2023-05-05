import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
	children: string;
}

export const Heading = ({ className, children }: Props) => (
	<h2 className={twMerge("text-center text-2xl font-bold text-white", className)}>{children}</h2>
);
