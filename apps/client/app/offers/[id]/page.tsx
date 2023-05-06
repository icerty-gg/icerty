import Image from "next/image";
import Link from "next/link";
import {
	BiAddToQueue,
	BiBadgeCheck,
	BiLocationPlus,
	BiSmile,
	BiData,
	BiCategoryAlt,
} from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { Button } from "../../../components/common/Button";
import { Container } from "../../../components/ui/Container";
import { FollowButton } from "../../../components/ui/FollowButton";
import { GetBackButton } from "../../../components/ui/GetBackButton";
import { Heading } from "../../../components/ui/Heading";
import { Slider } from "../../../components/ui/slider/Slider";
import { api } from "../../../utils/api";

import { SimilarOffers } from "./SimilarOffers";

import type { ReactNode } from "react";

export const generateStaticParams = async () => {
	const { offers } = await api.get("/api/offers/");

	return offers.map((o) => ({
		id: o.id,
	}));
};

const parseDate = (date: string) => {
	const dateObj = new Date(date);

	return dateObj.toLocaleDateString("us-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

interface OfferProps {
	className?: string;
	icon: ReactNode;
	title: string;
	type: string;
}

const OfferParams = ({ className, icon, title, type }: OfferProps) => {
	return (
		<p
			className={twMerge(
				"flex items-center gap-4 rounded-lg bg-sky-400/10 px-4 py-2 text-sm text-sky-600",
				className,
			)}
		>
			{icon}
			<div className="flex flex-col gap-[0.1rem]">
				<p className="text-white">{title}</p>
				<p>{type}</p>
			</div>
		</p>
	);
};

const OfferDetails = async ({ params }: { params: { id: string } }) => {
	const offer = await api.get("/api/offers/:id", { params });

	// const { offers } = await api.get('/offers/')
	const createdDate = parseDate(offer.createdAt);

	const offerParamsData = [
		{
			title: "City",
			type: offer.city,
			icon: <BiLocationPlus className="text-xl" />,
		},
		{
			title: "Condition",
			type: offer.condition,
			icon: <BiSmile className="text-xl" />,
		},
		{
			title: "Count",
			type: offer.count.toString(),
			icon: <BiData className="text-xl" />,
		},
		{
			title: "Category",
			type: offer.category.name,
			icon: <BiCategoryAlt className="text-xl" />,
		},
		{
			title: "Added at",
			type: createdDate,
			className: "col-span-2",
			icon: <BiAddToQueue className="text-xl" />,
		},
	];

	return (
		<div className="grid grid-cols-[2fr,_1fr] gap-4 max-lg:grid-cols-1">
			<div className="grid grid-cols-1 gap-4 max-lg:col-span-2">
				<div className="relative grid gap-4">
					<Slider images={offer.images} />
					<GetBackButton />
				</div>
				<div className="grid grid-cols-1 gap-4 max-lg:grid-cols-1">
					<Container>
						<Heading className="pb-4">Description</Heading>

						<p className="text-white">{offer.description}</p>
					</Container>
				</div>
				<Container>
					<Heading className="pb-4">Similar offers</Heading>

					<SimilarOffers category={offer.category.name} />
				</Container>
			</div>
			<div className="relative h-full w-full">
				<div className="sticky top-[6rem] max-lg:col-span-2">
					<div className="grid grid-cols-1 gap-4">
						<Container>
							<Heading className="pb-4">About offer</Heading>
							<div className="flex flex-col gap-8">
								<div className="flex flex-col gap-2">
									<p className="flex items-center gap-2 text-sky-500">
										<BiBadgeCheck className="text-xl" /> Item is Avaible
									</p>
									<h1 className="text-3xl text-white">{offer.name}</h1>
									<p className="text-2xl font-bold text-white">{offer.price} USD</p>
								</div>

								<div className="flex flex-col gap-4">
									<div className="grid grid-cols-2 gap-4">
										{offerParamsData.map((o) => {
											return (
												<OfferParams
													key={o.title}
													title={o.title}
													type={o.type}
													className={o.className}
													icon={o.icon}
												/>
											);
										})}
									</div>
								</div>
								<div className="flex items-center gap-4">
									<Button className="w-full">Buy</Button>
									<FollowButton id={offer.id} />
								</div>
							</div>
						</Container>

						<Container className="flex flex-col gap-2">
							<Heading className="pb-4">About seller</Heading>
							<div className="flex flex-col gap-2 rounded-lg bg-sky-400/10 p-2 text-sky-600">
								<Link href="/user" className="flex items-center gap-2 p-2">
									<Image
										src={offer.user.img}
										width={50}
										height={50}
										alt={`Profile picture of ${offer.user.name} ${offer.user.surname}`}
										className="h-[2.5rem] w-[2.5rem] rounded-[50%]"
									/>
									<p className="text-lg text-white">
										{offer.user.name} {offer.user.surname}
									</p>
								</Link>
								<p className="flex items-center gap-2 text-sky-500">
									<BiBadgeCheck className="text-xl" /> Verified seller
								</p>
							</div>
						</Container>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferDetails;
