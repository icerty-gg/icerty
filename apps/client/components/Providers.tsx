"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";

import type { QueryOptions } from "@tanstack/react-query";
import type { ReactNode } from "react";

const customRetry: QueryOptions["retry"] = (failureCount, error) => {
	if (failureCount > 3) {
		return false;
	}

	if (!isAxiosError(error) || !error.response) {
		return true;
	}

	if (error.response.status === 0 || error.response.status > 500) {
		return true;
	}

	return false;
};

export const Providers = ({ children }: { readonly children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: customRetry,
			},
			mutations: {
				retry: customRetry,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
