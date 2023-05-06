import Image from "next/image";
import Link from "next/link";
import { CiHashtag, CiLocationOn } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

import { FollowButton } from "../components/common/follow-button";
import { api } from "../utils/api";

import { FindOffersInput } from "./find-offers-input";

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
	title: "Browse offers",
};

const HomePage = async ({ searchParams }: Props) => {
	const { offers } = await api.get("/api/offers/", {
		queries: {
			name: typeof searchParams?.search === "string" ? searchParams?.search : undefined,
		},
	});

	return (
		<>
			<aside className="w-96 bg-secondaryWhite p-10">
				<h2 className="text-3xl font-bold text-black">Fiter</h2>
			</aside>
			<div className="flex h-screen w-full flex-col bg-primaryWhite px-6 py-4 shadow-lg">
				<div className="flex items-center justify-between pb-4">
					<h2 className="text-4xl font-bold text-black">Offers</h2>

					<FindOffersInput />
				</div>

				<ul className="flex w-full flex-grow flex-col gap-4 overflow-auto">
					{offers.map((o) => (
						<li
							key={o.id}
							className={twMerge(
								"relative flex items-center gap-6 rounded-md border border-gray bg-primaryWhite transition-colors hover:bg-secondaryWhite",
								o.isPromoted && "border border-sky-500/40 bg-sky-800/10 hover:bg-sky-800/20",
							)}
						>
							<Link href={`/offers/${o.id}`} className="flex h-full w-full items-center">
								<Image
									width={210}
									height={210}
									src={o.image}
									alt={o.name}
									className="pointer-events-none max-h-[14rem] min-h-[14rem] rounded-md object-cover max-md:max-w-[8rem]"
								/>

								<div className="p-4">
									<div className="flex w-full items-center justify-between">
										<div className="flex flex-col gap-2 text-black">
											<div className="flex items-center gap-4">
												<h3 className="line-clamp-none text-xl md:line-clamp-2">{o.name}</h3>
												{o.isPromoted && (
													<p className="z-10 rounded-full border border-sky-500/90 bg-sky-500/60 px-4 py-2 text-center text-sm text-black max-lg:text-xs">
														Promoted offer
													</p>
												)}
											</div>
											<p className="text-2xl font-bold text-black">
												{o.price} <span className="text-sm">USD</span>
											</p>
										</div>
									</div>

									<div className="absolute bottom-4 right-4 flex items-center gap-2">
										<p className="flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm text-sky-600">
											<CiHashtag className="text-lg" /> {o.categoryName}
										</p>

										<p className="flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm text-sky-600">
											<CiLocationOn className="text-lg" /> {o.city}
										</p>
									</div>
								</div>
							</Link>
							<FollowButton id={o.id} className="absolute right-4 top-4" />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default HomePage;
