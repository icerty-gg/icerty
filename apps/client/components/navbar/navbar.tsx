import Link from "next/link";

import { ProfileIcon } from "./navbar-profile-icon";

export const Navbar = () => {
	return (
		<nav className="sticky top-0 z-50 border-b-2 border-b-gray bg-primaryWhite">
			<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-8 p-4">
				<div className="flex items-center gap-8">
					<h1>
						<Link href="/" className="text-3xl font-bold text-black">
							Icerty
						</Link>
					</h1>

					<Link
						href="/"
						className="rounded-md border border-gray bg-tertiaryWhite px-4 py-2 text-base text-black outline-none focus:border-darkGray"
					>
						Offers
					</Link>
				</div>
				<ProfileIcon />
			</div>
		</nav>
	);
};
