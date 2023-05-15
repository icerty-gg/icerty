"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { Input } from "../components/common/input";
import { LoadingSpinner } from "../components/common/loading-spinner";

export const FindOffersInput = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const newParams = new URLSearchParams(searchParams);

		if (e.target.value) {
			newParams.set("search", e.target.value);
		} else {
			newParams.delete("search");
		}

		startTransition(() => {
			router.replace(`${pathname}?${newParams.toString()}`);
		});
	};

	return (
		<div className="relative flex items-center">
			<Input
				type="search"
				placeholder="Search"
				withFormCtx={false}
				showLabel={false}
				defaultValue={searchParams.get("search") ?? ""}
				onChange={handleSearch}
				name="Search offers"
				label="Search offers"
				icon={<BiSearchAlt2 className="text-2xl text-gray" />}
			/>

			{isPending && <LoadingSpinner className="absolute right-8 h-5 w-5" />}
		</div>
	);
};
