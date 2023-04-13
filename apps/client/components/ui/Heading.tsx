import { twMerge } from "tailwind-merge";

interface Props {
	readonly className?: string;
	readonly title: string;
}

// zmienić title na children !!!
export const Heading = ({ className, title }: Props) => (
	<h2 className={twMerge("text-center text-2xl font-bold text-white", className)}>{title}</h2>
);
