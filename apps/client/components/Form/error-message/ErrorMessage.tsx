import { BiErrorCircle } from "react-icons/bi";

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<p className="flex items-center gap-2 text-sm text-red-700" role="alert">
			<BiErrorCircle className="text-lg" /> {children}
		</p>
	);
};
