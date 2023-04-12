"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const useParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const categoryParams = searchParams.get("category");
	const titleParams = searchParams.get("title");

	return { categoryParams, titleParams, searchParams, router, pathname };
};
