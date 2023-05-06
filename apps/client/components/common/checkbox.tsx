import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { ErrorMessage } from "./form";

interface Props extends ComponentProps<"input"> {
	name: string;
	children: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(({ children, ...props }, ref) => {
	const form = useFormContext();
	const state = form.getFieldState(props.name);

	return (
		<div className="flex w-full flex-col gap-4">
			<label
				className="flex cursor-pointer items-center gap-4 text-sm text-black"
				htmlFor={props.name}
			>
				<input
					className="h-[1.3rem] w-[1.3rem] cursor-pointer appearance-none rounded-full border border-gray p-2 text-sky-500 checked:bg-sky-500"
					{...props}
					type="checkbox"
					aria-invalid={state.error?.message ? "true" : "false"}
					id={props.name}
					ref={ref}
				/>
				{children}
			</label>
			{state.error?.message && <ErrorMessage>{state.error.message}</ErrorMessage>}
		</div>
	);
});
