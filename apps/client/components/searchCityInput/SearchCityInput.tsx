"use client";

import { useState, useEffect } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { api } from "../../utils/fetcher";

import type { ChangeEvent } from "react";

interface Props {
	className?: string;
}

export const SearchCityInput = ({ className }: Props) => {
	const [cities, setCities] = useState<string[]>([]);
	const [singleCity, setSingleCity] = useState("");
	const [isOpenDropdown, setIsOpenDropdown] = useState(!!singleCity);

	useEffect(() => {
		const getCities = async () => {
			const { offers } = await api.get("/api/offers/");
			const allCities = offers.map((o) => o.city);

			const filteredCities = allCities.filter((city, index) => allCities.indexOf(city) === index);

			setCities(filteredCities);
		};

		void getCities();
	}, []);

	const onChangeCityHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredCities = cities.filter((city) =>
			city.toLowerCase().includes(e.target.value.toLowerCase()),
		);

		setCities(filteredCities);
	};

	return (
		<div className="relative flex w-full items-center">
			<input
				id="searchCityInput"
				type="search"
				placeholder="Everywhere"
				className={twMerge(
					"w-full rounded-full border border-slate-800 bg-gray-800/20 p-4 pl-12 text-white hover:border-sky-400/20 focus:border-sky-400/20 focus:outline-none",
					className,
				)}
				onFocus={() => setIsOpenDropdown(true)}
				onBlur={() => setTimeout(() => setIsOpenDropdown(false), 100)}
				value={singleCity}
				onChange={onChangeCityHandler}
			/>
			<label htmlFor="searchCityInput" className="absolute left-4">
				<BiLocationPlus className="text-xl text-white" />
			</label>

			<div
				className={`absolute left-0 top-[100%] w-full overflow-hidden rounded-xl bg-gray-800 ${
					isOpenDropdown ? "grid" : "hidden"
				}`}
			>
				<ul
					className={`z-20 grid max-h-[15rem] grid-cols-1 overflow-hidden overflow-y-auto text-white`}
				>
					{cities.map((c) => (
						<li className="cursor-pointer text-center hover:bg-gray-700" key={c}>
							<button className="h-full w-full p-4" type="button" onClick={() => setSingleCity(c)}>
								{c}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
