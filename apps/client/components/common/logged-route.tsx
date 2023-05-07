"use client";

import { ZodiosResponseByPath } from "@zodios/core";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect } from "react";

import { useUser } from "../../hooks/user-hooks";
import { Api } from "../../utils/api";

interface Props {
	children: ReactNode;
}

type User = ZodiosResponseByPath<Api, "get", "/api/sessions/me">;

const UserCtx = createContext<User | null>(null);

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

	return <UserCtx.Provider value={userQuery.data}>{children}</UserCtx.Provider>;
};

// Every page wrapped with LoggedRoute will have access to user context which returns type safe user
// Ctx used outside of LoggedRoute will throw an error

export const useUserCtx = () => {
	const ctx = useContext(UserCtx);

	if (!ctx) {
		throw new Error("useUserCtx must be used inside LoggedRoute");
	}

	return ctx;
};
