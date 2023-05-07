"use client";

import Image from "next/image";
import Link from "next/link";
import { CiDollar, CiHeart, CiLogout, CiStar, CiUser } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

import { useLogout, useUser } from "../../hooks/user-hooks";

export const ProfileIcon = () => {
	const logout = useLogout();
	const userQuery = useUser();

	return (
		<>
			{userQuery.data ? (
				<div className="group relative">
					<Link href="/settings">
						<Image
							src={userQuery.data.img}
							alt={`Profile picture of ${userQuery.data.name}`}
							height={50}
							width={50}
							className="rounded-full"
						/>
					</Link>
					<div className="invisible absolute right-0 top-[115%] z-50 flex w-80 flex-col gap-4 rounded-md border border-gray bg-secondaryWhite p-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
						<div className="flex items-center gap-4 pb-2">
							<Image
								src={userQuery.data.img}
								alt={userQuery.data.name}
								width={40}
								height={40}
								className="rounded-full"
							/>
							<div className="flex items-start gap-2">
								<p className="text-xl text-black first-letter:uppercase">{userQuery.data.name}</p>
								<p className="text-xl text-black first-letter:uppercase">
									{userQuery.data.surname}
								</p>
							</div>
						</div>

						<ul className="flex flex-col justify-center border-b border-t border-b-gray border-t-gray py-2">
							<li>
								<Link
									className="flex items-center gap-4 rounded-md px-4 py-2 text-sm text-black transition-colors hover:bg-gray/40"
									href="/settings"
								>
									<CiUser className="text-2xl" />
									Account settings
								</Link>
							</li>
							<li>
								<Link
									className="flex items-center gap-4 rounded-md px-4 py-2 text-sm text-black transition-colors hover:bg-gray/40"
									href="/your-offers"
								>
									<CiDollar className="text-2xl" /> Your offers
								</Link>
							</li>
							<li>
								<Link
									className="flex items-center gap-4 rounded-md px-4 py-2 text-sm text-black transition-colors hover:bg-gray/40"
									href="/followed-offers"
								>
									<CiHeart className="text-2xl" /> Followed offers
								</Link>
							</li>
							<li>
								<Link
									className="flex items-center gap-4 rounded-md px-4 py-2 text-sm text-black transition-colors hover:bg-gray/40"
									href="/opinions"
								>
									<CiStar className="text-2xl" />
									Opinions
								</Link>
							</li>
						</ul>

						<button
							onClick={() => logout()}
							className={twMerge(
								"flex items-center justify-center gap-2 rounded-md bg-slate-200 px-4 py-2 font-medium text-black transition-colors hover:bg-slate-300",
							)}
						>
							<CiLogout className="text-xl" /> Logout
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link
						href="/login"
						className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300"
					>
						Login
					</Link>
					<Link
						href="/register"
						className="rounded-md bg-slate-200 px-4 py-2 font-medium text-black outline-none transition-colors hover:bg-slate-300 focus:bg-slate-300"
					>
						Register
					</Link>
				</div>
			)}
		</>
	);
};
