import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["./testsSetup.ts"],
	},
});
