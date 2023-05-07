import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { useRouter } from "next/navigation";

import { Api, api } from "../utils/api";
import { notify } from "../utils/notifications";

export const USER_QUERY_KEY = "user";

export const useUser = () => {
	const userQuery = useQuery({
		queryKey: [USER_QUERY_KEY],
		queryFn: () => api.get("/api/sessions/me"),
		staleTime: Infinity,
	});

	return userQuery;
};

type LoginData = ZodiosBodyByPath<Api, "post", "/api/sessions/login">;

export const useLogin = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutateAsync: login } = useMutation({
		mutationFn: (data: LoginData) => api.post("/api/sessions/login", data),
		onSuccess: async (user) => {
			queryClient.setQueryData([USER_QUERY_KEY], user);
			notify("Successfully logged in", "success");
			router.push("/");
		},
	});

	return login;
};

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate: logout } = useMutation({
		mutationFn: () => api.post("/api/sessions/logout", undefined),
		onSuccess: async () => {
			queryClient.setQueryData([USER_QUERY_KEY], null);
			notify("Logged out", "success");
			router.push("/");
		},
	});

	return logout;
};
