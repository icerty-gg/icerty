"use client";

import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -200 },
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="enter"
			exit="exit"
			transition={{ type: "spring" }}
			className="relative"
		>
			{children}
		</motion.div>
	);
};
