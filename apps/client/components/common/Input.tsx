"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { useToggle } from "../../hooks/useToggle";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
	name: string;
	icon: JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ icon, className, ...props }, ref) => {
	const [isVisible, toggleIsVisible] = useToggle();
	const form = useFormContext();
	const state = form.getFieldState(props.name);

	return (
		<div className={twMerge("flex w-full flex-col gap-[0.7rem]", className)}>
			<div className="group relative flex w-full items-center">
				<label
					className="flex h-[54px] items-center gap-2 rounded-l-full border  border-r-0 border-slate-800 bg-gray-800/20 p-4 text-sm text-white group-hover:border-sky-400/20"
					htmlFor={props.name}
				>
					{icon}
				</label>
				<div className="flex w-full items-center">
					<input
						className="w-full rounded-r-full border border-l-0 border-slate-800  bg-gray-800/20 p-4 pl-0 text-sm text-white focus:outline-none group-hover:border-sky-400/20 group-focus:border-sky-400/20"
						{...props}
						type={isVisible ? "text" : props.type}
						aria-invalid={state.error?.message ? "true" : "false"}
						id={props.name}
						ref={ref}
					/>

					{props.type === "password" &&
						(isVisible ? (
							<button
								onClick={toggleIsVisible}
								className="absolute right-4 text-xl text-white"
								type="button"
							>
								<AiOutlineEyeInvisible />
							</button>
						) : (
							<button
								onClick={toggleIsVisible}
								className="absolute right-4 text-xl text-white"
								type="button"
							>
								<AiOutlineEye />
							</button>
						))}
				</div>
			</div>
			{state.error?.message && (
				<p className="flex items-center gap-2 text-sm text-red-700" role="alert">
					<BiErrorCircle className="text-lg" /> {state.error.message}
				</p>
			)}
		</div>
	);
});
