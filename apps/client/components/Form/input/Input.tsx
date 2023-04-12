"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useToggle } from "../../../hooks/useToggle";
import { ErrorMessage } from "../error-message/ErrorMessage";

import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	readonly className?: string;
	readonly errorMessage?: string;
	readonly icon: JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ className, errorMessage, icon, id, type, ...rest }, ref) => {
		const [isVisible, toggleIsVisible] = useToggle();

		return (
			<div className={clsx("flex w-full flex-col gap-[0.7rem]", className)}>
				<div className="group relative flex w-full items-center">
					<label
						className="flex h-[54px] items-center gap-2 rounded-l-full border  border-r-0 border-slate-800 bg-gray-800/20 p-4 text-sm text-white group-hover:border-sky-400/20"
						htmlFor={id}
					>
						{icon}
					</label>
					<div className="flex w-full items-center">
						<input
							className="w-full rounded-r-full border border-l-0 border-slate-800  bg-gray-800/20 p-4 pl-0 text-sm text-white focus:outline-none group-hover:border-sky-400/20 group-focus:border-sky-400/20"
							type={isVisible ? "text" : type}
							aria-invalid={errorMessage ? "true" : "false"}
							id={id}
							ref={ref}
							{...rest}
						/>

						{type === "password" &&
							(isVisible ? (
								<AiOutlineEyeInvisible
									onClick={toggleIsVisible}
									className="absolute right-4 cursor-pointer text-xl text-white"
								/>
							) : (
								<AiOutlineEye
									onClick={toggleIsVisible}
									className="absolute right-4 cursor-pointer text-xl text-white"
								/>
							))}
					</div>
				</div>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</div>
		);
	},
);
