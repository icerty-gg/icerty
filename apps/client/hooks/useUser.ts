import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { useRouter } from "next/navigation";

import { Api, api } from "../utils/api";
import { notify } from "../utils/notifications";

const USER_QUERY_KEY = "user";

type UserLoginData = ZodiosBodyByPath<Api, "post", "/api/sessions/login">;

export const useUser = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const userQuery = useQuery({
		queryKey: [USER_QUERY_KEY],
		queryFn: () => api.get("/api/sessions/me"),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		// Do not refetch after user is unauthorized on first load - query that errors is never stale
	});

	const { mutateAsync: login } = useMutation({
		mutationFn: (data: UserLoginData) => api.post("/api/sessions/login", data),
		onSuccess: async (user) => {
			queryClient.setQueryData([USER_QUERY_KEY], user);
			notify("Successfully logged in", "success");
			router.push("/");
		},
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => api.post("/api/sessions/logout", undefined),
		onSuccess: async () => {
			queryClient.setQueryData([USER_QUERY_KEY], null);
			notify("Logged out", "success");
			router.push("/");
		},
	});

	return { userQuery, logout, login };
};
