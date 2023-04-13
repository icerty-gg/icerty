"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { Button, ButtonLink } from "../../../components/common/Button";
import { Offer } from "../../../components/offers/Offer";
import { api } from "../../../utils/fetcher";

import { LoadingSpinner } from "./../../../components/ui/LoadingSpinner";

export const SimilarOffers = ({ category }: { readonly category: string }) => {
	const [visibleOffers, setVisibleOffers] = useState(5);

	console.log(visibleOffers);

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ["offers"],
		queryFn: () => api.get("/api/offers/", { queries: { take: visibleOffers } }),
		select(data) {
			return data.offers.filter((d) => d.categoryName === category);
		},
	});

	useEffect(() => void refetch(), [refetch, visibleOffers]);

	if (isLoading) return <p>Loading...</p>;

	if (isError) return <p>An error occured</p>;

	return (
		<ul className="grid grid-cols-1 gap-4">
			{data?.map((o) => {
				return <Offer key={o.id} {...o} />;
			})}

			<Button onClick={() => setVisibleOffers((p) => p + 5)}>
				{isLoading ? <LoadingSpinner size="w-[18px] h-[18px]" /> : <p>Show more</p>}
			</Button>

			<ButtonLink intent="secondary" href="/offers">
				All offers
			</ButtonLink>
		</ul>
	);
};
