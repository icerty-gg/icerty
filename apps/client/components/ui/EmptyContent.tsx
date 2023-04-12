import Image from "next/image";

export const EmptyContent = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<Image src="/empty.png" alt="empty lists" width={250} height={250} />
			<p className="text-center text-lg text-white">Nothing here</p>
		</div>
	);
};
