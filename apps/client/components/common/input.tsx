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
	label: string;
	showLabel?: boolean;
	withFormCtx?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ icon, withFormCtx = true, showLabel, className, ...props }, ref) => {
		const [isVisible, toggleIsVisible] = useToggle();
		const form = useFormContext();
		const state = withFormCtx ? form.getFieldState(props.name) : null;

		return (
			<div className={twMerge("flex w-full flex-col gap-2", className)}>
				<label htmlFor={props.name} className={twMerge(!showLabel && "sr-only")}>
					{props.label}
				</label>
				<div className="relative flex items-center">
					<input
						className="w-full rounded-md border border-gray bg-primaryWhite p-4 pl-12 text-black outline-none focus:border-darkGray disabled:bg-gray/30"
						{...props}
						type={isVisible ? "text" : props.type}
						aria-invalid={!state ? "false" : state.error?.message ? "true" : "false"}
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
					<span className="absolute left-4">{icon}</span>
				</div>

				{state?.error?.message && <ErrorMessage>{state.error.message}</ErrorMessage>}
			</div>
		);
	},
);
