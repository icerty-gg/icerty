import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const button = cva("transition-all rounded-full", {
	variants: {
		intent: {
			primary: [
				"group relative flex items-center justify-center gap-2 overflow-hidden bg-sky-500 px-6 py-[0.6rem] text-white",
			],
			secondary: [
				"border border-slate-800 bg-sky-400/10 px-10 py-[0.6rem] text-sky-600 hover:border-sky-500 hover:bg-sky-400/20",
			],
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof button> {}

const HoverEffect = () => (
	<span className="absolute h-0 w-0 translate-x-[-50%,_-50%] rounded-[50%] bg-white/20 transition-all duration-500 group-hover:h-[60rem] group-hover:w-[60rem]" />
);

export const Button = ({ className, intent = "primary", children, ...props }: ButtonProps) => (
	<button className={twMerge(button({ intent, className }))} {...props}>
		{children}

		{intent === "primary" && <HoverEffect />}
	</button>
);

interface ButtonLinkProps extends ComponentProps<typeof Link>, VariantProps<typeof button> {}

export const ButtonLink = ({
	className,
	intent = "primary",
	children,
	...props
}: ButtonLinkProps) => (
	<Link className={twMerge(button({ intent, className }))} {...props}>
		{children}

		{intent === "primary" && <HoverEffect />}
	</Link>
);
