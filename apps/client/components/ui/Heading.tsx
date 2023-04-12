import clsx from "clsx";

interface Props {
	readonly className?: string;
	readonly title: string;
}

// zmienić title na children !!!
export const Heading = ({ className, title }: Props) => (
	<h2 className={clsx("text-center text-2xl font-bold text-white", className)}>{title}</h2>
);
