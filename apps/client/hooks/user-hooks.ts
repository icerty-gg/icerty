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
		refetchOnWindowFocus: false,
		// Do not refetch on windows focus after user is unauthorized after first load -- data is never stale when it's error
	});

	return userQuery;
};

type LoginData = ZodiosBodyByPath<Api, "post", "/api/sessions/login">;

export const useLogin = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutateAsync: login } = useMutation({
		mutationFn: (data: LoginData) => api.post("/api/sessions/login", data),
		onSuccess: (data) => {
			queryClient.setQueryData([USER_QUERY_KEY], () => data);
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
		onSuccess: () => {
			queryClient.setQueryData([USER_QUERY_KEY], () => null);
			notify("Logged out", "success");
			router.push("/");
		},
	});

	return logout;
};

export const useDeleteMyAccount = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: deleteMyAccount } = useMutation({
		mutationFn: () => api.delete("/api/users/me", undefined),
		onSuccess: () => {
			queryClient.setQueryData([USER_QUERY_KEY], null);
			notify("Account deleted", "success");
			router.push("/");
		},
	});

	return deleteMyAccount;
};
