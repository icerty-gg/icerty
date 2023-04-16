"use client";

import Image from "next/image";
import Link from "next/link";
import { CiHashtag, CiLocationOn } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

import { FollowButton } from "../ui/FollowButton";

import type { Api } from "../../utils/api";
import type { ZodiosResponseByPath } from "@zodios/core";

type Response = ZodiosResponseByPath<Api, "get", "/api/offers/">;

export const Offer = ({
	categoryName,
	city,
	id,
	image,
	isPromoted,
	name,
	price,
}: Response["offers"][number]) => {
	return (
		<li
			className={twMerge(
				"relative flex items-center gap-6 rounded-xl border border-slate-800 bg-gray-800/20 transition-colors hover:bg-sky-800/10",
				isPromoted && "border border-sky-500/40 bg-sky-800/10 hover:bg-sky-800/20",
			)}
		>
			<div className="relative h-full w-full">
				<Link href={`/offers/${id}`} className="flex h-full w-full items-center">
					<Image
						width={210}
						height={210}
						src={image}
						alt={name}
						className="pointer-events-none max-h-[14rem] min-h-[14rem] rounded-md object-cover max-md:max-w-[8rem]"
					/>

					<div className="realtive p-4">
						<div className="flex w-full items-center justify-between">
							<div className="flex flex-col gap-2 text-white">
								<div className="flex items-center gap-4">
									<h3 className="line-clamp-none text-xl md:line-clamp-2">{name}</h3>
									{isPromoted && (
										<p className="z-10 rounded-full border border-sky-500/90 bg-sky-500/60 px-4 py-2 text-center text-sm text-white max-lg:text-xs">
											Promoted offer
										</p>
									)}
								</div>
								<p className="text-2xl font-bold text-white">
									{price} <span className="text-sm">USD</span>
								</p>
							</div>
						</div>

						<div className="absolute bottom-4 right-4 flex items-center gap-2">
							<p className="flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm text-sky-600">
								<CiHashtag className="text-lg" /> {categoryName}
							</p>

							<p className="flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm text-sky-600">
								<CiLocationOn className="text-lg" /> {city}
							</p>
						</div>
					</div>
				</Link>
				<FollowButton id={id} className="absolute right-4 top-4" />
			</div>
		</li>
	);
};
