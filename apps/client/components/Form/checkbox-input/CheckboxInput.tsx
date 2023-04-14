import { forwardRef } from "react";

import { ErrorMessage } from "../error-message/ErrorMessage";

import type { ReactNode, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	errorMessage?: string;
}

export const CheckboxInput = forwardRef<HTMLInputElement, Props>(
	({ children, errorMessage, id, ...rest }, ref) => {
		return (
			<div className="flex w-full flex-col gap-4">
				<label className="flex cursor-pointer items-center gap-4 text-sm text-white" htmlFor={id}>
					<input
						type="checkbox"
						className="h-[1.3rem] w-[1.3rem] cursor-pointer appearance-none rounded-full border border-slate-800 p-2 text-sky-500 checked:bg-sky-500"
						id={id}
						aria-invalid={errorMessage ? "true" : "false"}
						ref={ref}
						{...rest}
					/>
					{children}
				</label>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</div>
		);
	},
);
