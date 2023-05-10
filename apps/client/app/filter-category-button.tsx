"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { twMerge } from "tailwind-merge";

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
