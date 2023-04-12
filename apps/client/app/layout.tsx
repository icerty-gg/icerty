import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "@next/font/google";
import { Suspense } from "react";

import type { ReactNode } from "react";
import { Providers } from "../components/Providers";
// import { ToastContainer } from '../components/ToastContainer'
import { Navbar } from "../components/navbar/Navbar";

import Loading from "./loading";


const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-inter",
});

const RootLayout = ({ children }: { readonly children: ReactNode }) => {
	return (
		<html className={`${roboto.variable} font-sans`} lang="en">
			<body className="relative bg-gray-900">
				<Providers>
					<Navbar />
					<Suspense fallback={<Loading />}>
						<main className="my-0 mx-auto w-full max-w-screen-2xl px-8 py-32 max-md:px-4">
							{children}
							<div className="pointer-events-none absolute top-28 right-0 h-[50rem] w-[50rem] rounded-full bg-sky-500 opacity-10 blur-[250px]" />
						</main>
					</Suspense>
					{/* <ToastContainer /> */}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
