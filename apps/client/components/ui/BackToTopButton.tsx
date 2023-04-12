"use client";

import { BiArrowBack } from "react-icons/bi";

import { useCheckScroll } from "../../hooks/useCheckScroll";

export const BackToTopButton = () => {
	const isVisible = useCheckScroll(800);

	return (
		<button
			className={`fixed bottom-12 right-4 transition-transform ${
				isVisible ? "translate-x-[0]" : "translate-x-[150%]"
			} flex items-center gap-2 rounded-full border border-slate-300/10 bg-sky-500/10 py-2 px-4 text-white hover:bg-sky-400/20`}
			onClick={() => (document.documentElement.scrollTop = 0)}
		>
			<BiArrowBack className="rotate-90" />
			<p>Top</p>
		</button>
	);
};
