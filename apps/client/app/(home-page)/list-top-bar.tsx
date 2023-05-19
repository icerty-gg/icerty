"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { Input } from "../../components/common/input";
import { Select } from "../../components/common/select";

export const ListTopBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [, startTransition] = useTransition();
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

	const handleOrderDirectionChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("order_direction", value);

		startTransition(() => {
			router.replace(`${pathname}?${newParams.toString()}`);
		});
	};

	const handleOrderByChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("order_by", value);

		startTransition(() => {
			router.replace(`${pathname}?${newParams.toString()}`);
		});
	};

	return (
		<>
			<Select
				data={[
					{ label: "Price", value: "price" },
					{ label: "Creation date", value: "createdAt" },
				]}
				defaultValue="createdAt"
				onValueChange={handleOrderByChange}
			/>

			<Select
				data={[
					{ label: "Ascending", value: "asc" },
					{ label: "Descending", value: "desc" },
				]}
				defaultValue="asc"
				onValueChange={handleOrderDirectionChange}
			/>

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
		</>
	);
};
