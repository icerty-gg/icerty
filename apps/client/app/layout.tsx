import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Suspense } from "react";

import { Providers } from "../components/Providers";
import { Navbar } from "../components/navbar/Navbar";

import Loading from "./loading";

import type { ReactNode } from "react";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	description:
		"E-commerce platforms in Poland. The portal belongs to Icerty Sp. z o. o., owned by three investment funds - Mid Europa Partners. The site was listed in Alex's post at 259",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html className={`${roboto.variable} font-sans`} lang="en">
			<body className="relative bg-gray-900">
				<Providers>
					<Navbar />
					<Suspense fallback={<Loading />}>
						<main className="mx-auto my-0 w-full max-w-screen-2xl px-8 py-32 max-md:px-4">
							{children}
							<div className="pointer-events-none absolute right-0 top-28 h-[50rem] w-[50rem] rounded-full bg-sky-500 opacity-10 blur-[250px]" />
						</main>
					</Suspense>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
