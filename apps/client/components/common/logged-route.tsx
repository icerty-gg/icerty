"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useUser } from "../../hooks/user-hooks";

interface Props {
	children: ReactNode;
}

export const LoggedRoute = ({ children }: Props) => {
	const userQuery = useUser();
	const router = useRouter();

	useEffect(() => {
		if (userQuery.isLoading) return;

		if (!userQuery.data) {
			router.replace("/login");
			return;
		}
	}, [userQuery, router]);

	if (userQuery.isLoading || !userQuery.data) {
		return null;
	}

	return <>{children}</>;
};
