"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { EmptyContent } from "../../../components/ui/EmptyContent";
import { FollowButton } from "../../../components/ui/FollowButton";
import { Heading } from "../../../components/ui/Heading";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import { api } from "../../../utils/api";

export const Lists = () => {
	const { data: offers, isLoading } = useQuery({
		queryKey: ["followedOffers"],
		queryFn: () => api.get("/api/offers/", { queries: { followed: true } }),
	});

	// const groupedByCategory = offers?.offers.reduce((acc, offer) => {
	//   acc[offer.categoryName] ??= [];
	//   acc[offer.categoryName].push(offer);
	//   return acc;
	// }, {});

	return (
		<div className="flex h-full w-full flex-col items-center gap-4">
			<div className="flex items-center gap-2">
				<Heading>Your lists</Heading>
				{offers?.offers.length ? <p className=" text-white">({offers?.offers.length})</p> : null}
			</div>

			<div className="flex h-full w-full items-center justify-center">
				{isLoading ? (
					<LoadingSpinner size="w-10 h-10" />
				) : !offers?.offers.length ? (
					<EmptyContent />
				) : (
					<ul className="grid w-full grid-cols-1 gap-4">
						{offers?.offers.map((o) => (
							<li
								key={o.id}
								className={twMerge(
									"relative flex items-center gap-6 rounded-xl border border-slate-800 bg-gray-800/20 transition-colors hover:bg-sky-800/10",
								)}
							>
								<div className="relative h-full w-full">
									<Link href={`/offers/${o.id}`} className="flex h-full w-full items-center">
										<Image
											width={210}
											height={210}
											src={o.image}
											alt={o.name}
											className="pointer-events-none max-h-[14rem] min-h-[14rem] rounded-md object-cover max-md:max-w-[8rem]"
										/>

										<div className="realtive p-4">
											<div className="flex w-full items-center justify-between">
												<div className="flex flex-col gap-2 text-white">
													<div className="flex items-center gap-4">
														<h3 className="line-clamp-none text-xl md:line-clamp-2">{o.name}</h3>
													</div>
													<p className="text-2xl font-bold text-white">
														{o.price} <span className="text-sm">USD</span>
													</p>
												</div>
											</div>
										</div>
									</Link>
									<FollowButton id={o.id} className="absolute right-4 top-4" />
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
