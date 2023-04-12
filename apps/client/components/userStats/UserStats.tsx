"use client";

import { useState } from "react";

import { PrimaryLink } from "../ui/primary-button/PrimaryLink";

export const UserStats = () => {
	const [selectedStatus, setIsSelectedStatus] = useState<"offers" | "Followed">("offers");

	return (
		<div className="grid grid-cols-2 gap-4  text-white blur-md backdrop-blur max-lg:grid-cols-1">
			<div className="flex flex-col gap-4">
				<button
					onClick={() => setIsSelectedStatus("offers")}
					className={`flex w-full items-center justify-center rounded-2xl border border-slate-300/10 bg-gray-900/75 p-4 backdrop-blur hover:bg-sky-500/10 ${
						selectedStatus === "offers" ? "bg-sky-500/10" : "bg-gray-900/75"
					}`}
				>
					<h4>Twoje ogłoszenia</h4>
				</button>
				<button
					onClick={() => setIsSelectedStatus("Followed")}
					className={`flex w-full items-center justify-center rounded-2xl border border-slate-300/10 bg-gray-900/75 p-4 backdrop-blur hover:bg-sky-500/10 ${
						selectedStatus === "Followed" ? "bg-sky-500/10" : "bg-gray-900/75"
					}`}
				>
					<h4>Obserwowane ogłoszenia</h4>
				</button>
			</div>

			{selectedStatus === "offers" && (
				<div className="grid grid-cols-1 gap-4 ">
					{/* <Offer createdAt={'xd'} id={'awd'} image={undefined} name={'awd'} price={0} /> */}
					<PrimaryLink href="/offers">Zobacz wszystkie</PrimaryLink>
				</div>
			)}

			{selectedStatus === "Followed" && (
				<div className="grid grid-cols-1 gap-4 ">
					{/* <Offer createdAt={'awdd'} id={'2323'} image={undefined} name={'awd'} price={0} /> */}
					{/* <Offer createdAt={'ddd'} id={'4424'} image={undefined} name={'awdawd'} price={0} /> */}
					<PrimaryLink href="/followed">Zobacz wszystkie</PrimaryLink>
				</div>
			)}
		</div>
	);
};
