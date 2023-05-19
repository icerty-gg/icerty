import * as SelectPrimitive from "@radix-ui/react-select";
import { BsCheck } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface Props {
	data: { value: string; label: string }[];
	defaultValue: string;
	onValueChange: (value: string) => void;
	className?: string;
}

export const Select: React.FC<Props> = ({ data, defaultValue, onValueChange, className }) => {
	return (
		<SelectPrimitive.Root defaultValue={defaultValue} onValueChange={onValueChange}>
			<SelectPrimitive.Trigger
				className={twMerge(
					"flex h-full w-full items-center justify-between gap-2 rounded-md border border-gray bg-primaryWhite px-3 py-2 text-sm text-black outline-none focus:border-darkGray",
					className,
				)}
			>
				<SelectPrimitive.Value />
				<SelectPrimitive.Icon asChild>
					<IoChevronDownOutline className="h-4 w-4 opacity-50" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					className={twMerge(
						"animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray bg-primaryWhite shadow-md",
						"translate-y-1",
					)}
					position="popper"
				>
					<SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1">
						{data.map((item) => (
							<SelectPrimitive.Item
								value={item.value}
								key={item.value}
								className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-black outline-none focus:bg-tertiaryWhite"
							>
								<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
									<SelectPrimitive.ItemIndicator>
										<BsCheck className="h-4 w-4" />
									</SelectPrimitive.ItemIndicator>
								</span>

								<SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
};
