import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Navbar } from "../components/navbar/navbar";
import { Providers } from "../components/providers";

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
					<main className="mx-auto flex min-h-screen w-full max-w-screen-2xl">{children}</main>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
