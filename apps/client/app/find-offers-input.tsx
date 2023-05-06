"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { LoadingSpinner } from "../components/common/loading-spinner";

export const FindOffersInput = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(window.location.search);

		if (e.target.value) {
			params.set("search", e.target.value);
		} else {
			params.delete("search");
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<div className="relative flex items-center">
			<input
				type="text"
				id="searchOfferInput"
				placeholder="Search"
				onChange={handleSearch}
				className="w-full rounded-md border border-gray bg-primaryWhite p-4 pl-12 text-black"
			/>
			<label className="absolute left-4" htmlFor="searchOfferInput">
				<BiSearchAlt2 className="text-2xl text-gray" />
			</label>

			{isPending && <LoadingSpinner className="absolute right-8 h-5 w-5" />}
		</div>
	);
};
