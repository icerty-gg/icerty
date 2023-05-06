import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";

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
				className="flex cursor-pointer items-center gap-4 text-sm text-white"
				htmlFor={props.name}
			>
				<input
					className="h-[1.3rem] w-[1.3rem] cursor-pointer appearance-none rounded-full border border-slate-800 p-2 text-sky-500 checked:bg-sky-500"
					{...props}
					type="checkbox"
					aria-invalid={state.error?.message ? "true" : "false"}
					id={props.name}
					ref={ref}
				/>
				{children}
			</label>
			{state.error?.message && (
				<p className="flex items-center gap-2 text-sm text-red-700" role="alert">
					<BiErrorCircle className="text-lg" /> {state.error.message}
				</p>
			)}
		</div>
	);
});
