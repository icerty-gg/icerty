import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Suspense } from "react";

import { Providers } from "../components/Providers";
import { Navbar } from "../components/navbar/navbar";

import Loading from "./loading";

import type { ReactNode } from "react";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	description:
		"E-commerce platforms in Poland. The portal belongs to Icerty Sp. z o. o., owned by three investment funds - Mid Europa Partners. The site was listed in Alex's post at 259",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html className={`${roboto.variable} font-sans`} lang="en">
			<body className="min-h-screen bg-secondaryWhite">
				<Providers>
					<Navbar />
					<Suspense fallback={<Loading />}>
						<main className="mx-auto flex h-full w-full max-w-screen-2xl">{children}</main>
					</Suspense>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
