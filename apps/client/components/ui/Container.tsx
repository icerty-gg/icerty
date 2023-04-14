import { twMerge } from "tailwind-merge";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const Container = ({ children, className }: Props) => {
	return (
		<div
			className={twMerge(
				"rounded-2xl border border-slate-300/10 bg-gray-900/75 p-4 pt-6 backdrop-blur",
				className,
			)}
		>
			{children}
		</div>
	);
};
