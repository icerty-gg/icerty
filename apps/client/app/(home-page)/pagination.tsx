"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
	maxPage: number;
	currentPage: number;
	take: number;
	count: number;
}

export const Pagination = ({ maxPage, currentPage, take, count }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [, startTransition] = useTransition();

	const handlePreviousPage = () => {
		if (currentPage === 1) return;

		const params = new URLSearchParams(searchParams);

		params.set("page", (currentPage - 1).toString());

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	const handleNextPage = () => {
		if (currentPage === maxPage) return;

		const params = new URLSearchParams(searchParams);

		params.set("page", (currentPage + 1).toString());

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<div className="mt-4 border-gray">
			{maxPage > 1 && (
				<p className="text-right text-base text-black">
					Showing {currentPage * take - take} to {currentPage * take} of {count} results
				</p>
			)}

			<div className="flex justify-center gap-2">
				<button
					className="rounded-md border border-gray p-2 outline-none focus:border-darkGray disabled:opacity-70"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<button
					className="rounded-md border border-gray p-2 outline-none focus:border-darkGray disabled:opacity-70"
					onClick={handleNextPage}
					disabled={currentPage === maxPage}
				>
					Next
				</button>
			</div>
		</div>
	);
};
