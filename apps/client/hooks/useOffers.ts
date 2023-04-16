"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "../utils/api";

interface OffersParams {
	category?: string;
	city?: string;
	followed?: boolean;
	order_by: "createdAt" | "price" | undefined;
	order_direction: "asc" | "desc" | undefined;
	page: number;
	promoted?: boolean;
	take: number;
	title?: string;
}

export const useOffers = ({
	category,
	city,
	followed,
	order_by,
	order_direction,
	page,
	promoted,
	take,
	title,
}: OffersParams) => {
	const {
		data: offers,
		isFetching,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["offers"],
		queryFn: () =>
			api.get("/api/offers/", {
				queries: {
					take: take,
					page: page,
					order_direction: order_direction,
					order_by: order_by,
					category: category,
					followed: followed,
					city: city,
					promoted: promoted,
					name: title,
				},
			}),
	});

	return { offers, isLoading, refetch, isFetching };
};
