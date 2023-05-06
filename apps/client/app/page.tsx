import Image from "next/image";
import Link from "next/link";
import { BiLockAlt, BiSearchAlt2 } from "react-icons/bi";

import { Button, ButtonLink } from "../components/common/Button";
import { Offer } from "../components/offers/Offer";
import { SearchCityInput } from "../components/searchCityInput/SearchCityInput";
import { Container } from "../components/ui/Container";
import { Heading } from "../components/ui/Heading";
import { UserStats } from "../components/userStats/UserStats";
import { api } from "../utils/api";

const Home = async () => {
	const { categories } = await api.get("/api/categories/");
	const { offers } = await api.get("/api/offers/");

	return (
		<div className="grid grid-cols-2 gap-4">
			<Container className="z-20 col-span-2 bg-transparent">
				<Heading className="pb-6">Find offers</Heading>
				<form>
					<div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
						<div className="relative flex items-center">
							<input
								type="text"
								id="searchOfferInput"
								placeholder="Search offer"
								className="w-full rounded-full border border-slate-800 bg-gray-800/20 p-4 pl-12 text-white hover:border-sky-400/20 focus:border-sky-400/20 focus:outline-none"
							/>
							<label className="absolute left-4" htmlFor="searchOfferInput">
								<BiSearchAlt2 className="text-xl text-white" />
							</label>
						</div>
						<div className="flex items-center gap-4 max-md:flex-col">
							<SearchCityInput />
							<Button>
								<BiSearchAlt2 className="text-2xl" /> Find
							</Button>
						</div>
					</div>
				</form>
			</Container>

			<div className="col-span-2 grid grid-cols-[1fr,_2fr] gap-4 max-lg:grid-cols-1">
				<Container>
					<Heading className="pb-6">Categories</Heading>
					<ul className="sticky grid max-h-[35rem] grid-cols-2 gap-4 overflow-hidden overflow-y-scroll backdrop-blur max-lg:grid-cols-2 max-md:grid-cols-1">
						{categories.map((c) => (
							<li
								key={c.id}
								className="rounded-xl border border-slate-800 bg-gray-800/20 hover:bg-sky-800/10"
							>
								<Link
									className={`flex flex-col items-center gap-6 p-4`}
									href={`/offers?category=${c.name.toLowerCase()}`}
								>
									<div className="flex items-center justify-center rounded-full bg-sky-400/10">
										<Image
											className="pointer-events-none rounded-md"
											width={100}
											height={100}
											src={c.img}
											alt={c.name}
										/>
									</div>

									<h3 className="text-center text-white">{c.name}</h3>
								</Link>
							</li>
						))}
					</ul>
				</Container>

				<Container>
					<div className="flex items-center justify-center gap-4 pb-6">
						<Heading>Promoted offers </Heading>
						<ButtonLink intent="secondary" href="/offers">
							Check all
						</ButtonLink>
					</div>

					<ul className="sticky grid max-h-[35rem] min-w-[20rem] grid-cols-1 gap-4 overflow-hidden overflow-y-scroll backdrop-blur">
						{offers.map((o) => (
							<Offer {...o} key={o.id} />
						))}
					</ul>
				</Container>
			</div>

			<Container className="col-span-2">
				<Heading className="pb-6">Your offers</Heading>
				<div className="relative">
					<UserStats />

					<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6">
						<p className="flex items-center gap-4 text-center text-xl font-bold text-white">
							<BiLockAlt className="text-2xl" /> You need to login!
						</p>
						<ButtonLink href="/login">Login</ButtonLink>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Home;
