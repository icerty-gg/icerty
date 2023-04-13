"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

import { Button } from "../common/Button";

export const GetBackButton = () => {
	const router = useRouter();

	return (
		<Button
			intent="secondary"
			className="absolute left-4 top-4 flex items-center justify-center"
			onClick={() => router.back()}
		>
			<BiArrowBack className="text-xl" />
		</Button>
	);
};
