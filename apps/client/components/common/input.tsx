"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { useToggle } from "../../hooks/useToggle";

import { ErrorMessage } from "./form";

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
		<div className={twMerge("flex w-full flex-col gap-3", className)}>
			<div className="relative flex items-center">
				<input
					className="w-full rounded-md border border-gray bg-primaryWhite p-4 pl-12 text-black outline-none focus:border-darkGray"
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
							className="absolute right-4 text-xl text-black"
							type="button"
						>
							<AiOutlineEyeInvisible />
						</button>
					) : (
						<button
							onClick={toggleIsVisible}
							className="absolute right-4 text-xl text-black"
							type="button"
						>
							<AiOutlineEye />
						</button>
					))}
				<label className="absolute left-4" htmlFor={props.name}>
					{icon}
				</label>
			</div>

			{state.error?.message && <ErrorMessage>{state.error.message}</ErrorMessage>}
		</div>
	);
});
