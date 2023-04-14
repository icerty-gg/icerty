import { BiX } from "react-icons/bi";

interface Props {
	isOpened: boolean;
	onOpenNav: () => void;
}

export const MobileNavbar = ({ isOpened, onOpenNav }: Props) => {
	return (
		<div
			className={`${
				isOpened ? "translate-x-[0]" : "translate-x-[100%]"
			} fixed right-0 top-0 z-[22929] h-full w-96 border-l border-slate-300/10 bg-gray-900 backdrop-blur-md transition-transform`}
		>
			<div className="p-6">
				<button
					className="hidden rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700 max-lg:flex"
					onClick={onOpenNav}
				>
					<BiX className="text-2xl text-white" />
				</button>
			</div>
		</div>
	);
};
