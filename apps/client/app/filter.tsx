"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { BiDollar } from "react-icons/bi";
import { MdOutlineNumbers } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import { Input } from "../components/common/input";

import { POSITIVE_NUMBER_REGEX } from "./regexp";

interface Props {
	children: ReactNode;
	categoryName: string;
}

export const FilterCategoryButton = ({ children, categoryName }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [, startTransition] = useTransition();

	const handleClick = () => {
		const params = new URLSearchParams(searchParams);
		const categoriesInParams = params.getAll("category");

		if (categoriesInParams.includes(categoryName)) {
			// Remove clicked category from params
			params.delete("category");

			categoriesInParams
				.filter((c) => c !== categoryName)
				.forEach((c) => params.append("category", c));
		} else {
			// add new category to params
			params.append("category", categoryName);
		}
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<button
			onClick={handleClick}
			className={twMerge(
				"flex h-fit flex-col items-center gap-2 rounded-md border border-gray p-1",
				searchParams.getAll("category").includes(categoryName) && "bg-primaryWhite",
			)}
		>
			{children}
		</button>
	);
};

const usePositiveNumberInputChange = (paramName: string) => {
	const router = useRouter();
	const pathname = usePathname();
	const [, startTransition] = useTransition();
	const searchParams = useSearchParams();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newParams = new URLSearchParams(searchParams);

		// Replace all non numeric or 0 characters with empty string
		if (!POSITIVE_NUMBER_REGEX.test(e.target.value)) {
			e.target.value = "";
		}

		if (e.target.value) {
			newParams.set(paramName, e.target.value);
		} else {
			newParams.delete(paramName);
		}

		startTransition(() => {
			router.replace(`${pathname}?${newParams.toString()}`);
		});
	};

	const getDefaultValue = () => {
		const param = searchParams.get(paramName);

		if (!param || !param.match(POSITIVE_NUMBER_REGEX)) {
			return "";
		} else {
			return param;
		}
	};

	return {
		onChange: handleInputChange,
		defaultValue: getDefaultValue(),
	};
};

export const FilterPriceInputs = () => {
	const { onChange: handlePriceFromChange, defaultValue: priceFromDefaultValue } =
		usePositiveNumberInputChange("price_from");
	const { onChange: handlePriceToChange, defaultValue: priceToDefaultValue } =
		usePositiveNumberInputChange("price_to");

	return (
		<div className="grid grid-cols-2 gap-4">
			<Input
				name="Price from"
				showLabel={false}
				withFormCtx={false}
				label="Price from"
				icon={<BiDollar className="text-2xl text-gray" />}
				inputMode="numeric"
				pattern="(?!0$)[0-9]*"
				placeholder="From"
				defaultValue={priceFromDefaultValue}
				onChange={handlePriceFromChange}
			/>
			<Input
				name="Price to"
				showLabel={false}
				withFormCtx={false}
				label="Price to"
				icon={<BiDollar className="text-2xl text-gray" />}
				inputMode="numeric"
				pattern="(?!0$)[0-9]*"
				placeholder="To"
				defaultValue={priceToDefaultValue}
				onChange={handlePriceToChange}
			/>
		</div>
	);
};

export const FilterCountInputs = () => {
	const { onChange: handleCountFromChange, defaultValue: countFromDefaultValue } =
		usePositiveNumberInputChange("count_from");
	const { onChange: handleCountToChange, defaultValue: countToDefaultValue } =
		usePositiveNumberInputChange("count_to");

	return (
		<div className="grid grid-cols-2 gap-4">
			<Input
				name="Count from"
				showLabel={false}
				withFormCtx={false}
				label="Count from"
				icon={<MdOutlineNumbers className="text-2xl text-gray" />}
				inputMode="numeric"
				pattern="(?!0$)[0-9]*"
				placeholder="From"
				defaultValue={countFromDefaultValue}
				onChange={handleCountFromChange}
			/>
			<Input
				name="Count to"
				showLabel={false}
				withFormCtx={false}
				label="Count to"
				icon={<MdOutlineNumbers className="text-2xl text-gray" />}
				inputMode="numeric"
				pattern="(?!0$)[0-9]*"
				placeholder="To"
				defaultValue={countToDefaultValue}
				onChange={handleCountToChange}
			/>
		</div>
	);
};
