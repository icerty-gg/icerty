import { createApiClient, schemas } from "./apiSchemas";

import type { ApiOf } from "@zodios/core";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
	throw new Error("NEXT_PUBLIC_API_URL is not set!");
}

export const api = createApiClient(apiUrl);

api.axios.defaults.withCredentials = true;

export type Api = ApiOf<typeof api>;

export { schemas as SCHEMAS };
