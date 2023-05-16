import { NavbarLinks } from "./navbar-links";

export const Navbar = () => {
	return (
		<nav className="sticky top-0 z-50 border-b-2 border-b-gray bg-primaryWhite">
			<div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-8 p-4">
				<NavbarLinks />
			</div>
		</nav>
	);
};
