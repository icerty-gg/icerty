"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

import { PrimaryButton } from "../../components/ui/primary-button/PrimaryButton";
import { useParams } from "../../hooks/useParams";

import type { ChangeEvent, FormEvent } from "react";

export const SearchFilter = () => {
	const [searchInputValue, setSearchInputValue] = useState<string | null>(null);
	const { pathname, router, titleParams } = useParams();

	const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		setSearchInputValue(title);

		if (!title) router.push(pathname ?? "");
	};

	const setParamsHandler = (e: FormEvent) => {
		e.preventDefault();

		router.push(`${pathname}?title=${searchInputValue ?? ""}`);
	};

	useEffect(() => {
		if (!titleParams) router.push(pathname ?? "");
	}, [pathname, router, titleParams]);

	return (
		<form onSubmit={setParamsHandler} className="flex items-center gap-4">
			<div className="group relative flex w-full max-w-[15rem] items-center">
				<input
					id="searchInput"
					type="search"
					placeholder="Search offer..."
					className={clsx(
						"w-full rounded-full border border-slate-800 bg-gray-800/20 p-4 pl-12 text-white hover:border-sky-400/20 focus:border-sky-400/20 focus:outline-none",
					)}
					onChange={changeSearchValueHandler}
					defaultValue={titleParams ?? ""}
				/>
				<label htmlFor="searchInput" className="absolute left-4">
					<CiSearch className="text-xl text-white" />
				</label>
			</div>

			<PrimaryButton className={clsx(!searchInputValue && "pointer-events-none opacity-50")}>
				Search
			</PrimaryButton>
		</form>
	);
};
