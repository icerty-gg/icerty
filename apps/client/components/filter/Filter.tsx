import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { api } from "../../utils/fetcher";
import { CheckboxInput } from "../Form/checkbox-input/CheckboxInput";
import { SearchCityInput } from "../searchCityInput/SearchCityInput";
import { Container } from "../ui/Container";
import { Heading } from "../ui/Heading";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { PrimaryButton } from "../ui/primary-button/PrimaryButton";
import { SecondaryButton } from "../ui/secondary-button/SecondaryButton";

export const Filter = () => {
	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => api.get("/api/categories/"),
	});

	return (
		<div className="h-full w-full">
			<Container className="sticky top-[6rem] max-lg:col-span-2">
				<div className="flex items-center justify-center gap-4 pb-6">
					<Heading title="Filters" />
					<SecondaryButton>Clear</SecondaryButton>
				</div>

				<div className="grid max-h-[40rem] grid-cols-1 gap-4 overflow-hidden overflow-y-scroll">
					<Container className="z-20 flex flex-col items-center">
						<h4 className="pb-4 text-lg text-white">City</h4>

						<SearchCityInput />
					</Container>

					<Container className="flex flex-col items-center">
						<h4 className="pb-4 text-lg text-white">Category</h4>
						{isLoading ? (
							<LoadingSpinner size="w-10 h-10" />
						) : (
							<ul className="grid max-h-[25rem] w-full grid-cols-1 gap-4 overflow-hidden overflow-y-scroll">
								{categories?.categories.map((c) => {
									return (
										<li key={c.id}>
											<input type="checkbox" id={c.name} value={c.name} className="peer hidden" />
											<label
												htmlFor={c.name}
												className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-gray-800/20 p-2 text-white hover:bg-sky-800/10 peer-checked:border-sky-800 peer-checked:bg-sky-800/10"
											>
												<div className="flex items-center gap-4">
													<div className="flex items-center justify-center rounded-full bg-sky-400/10">
														<Image
															src={c.img}
															width={70}
															height={70}
															alt={c.name}
															className="pointer-events-none"
														/>
													</div>
													<div className="pointer-events-none text-lg">{c.name}</div>
												</div>
											</label>
										</li>
									);
								})}
							</ul>
						)}
					</Container>

					<Container className="flex flex-col items-center">
						<h4 className="pb-4 text-lg text-white">Item condition</h4>
						<div className="flex flex-col gap-4">
							<CheckboxInput>Used</CheckboxInput>
							<CheckboxInput>New</CheckboxInput>
						</div>
					</Container>

					<Container className="flex flex-col items-center">
						<h4 className="pb-4 text-lg text-white">Price</h4>

						<div className="flex items-center gap-2">
							<div className="relative flex items-center">
								<input
									type="text"
									className="w-full rounded-xl border border-slate-800 bg-gray-800/20 p-4 pl-16 text-white hover:border-sky-400/20 focus:border-sky-400/20 focus:outline-none"
								/>
								<span className="pointer-events-none absolute left-[1.2rem] text-white">USD</span>
							</div>

							<p className="text-white">-</p>
							<div className="relative flex items-center">
								<input
									type="text"
									className="w-full rounded-xl border border-slate-800 bg-gray-800/20 p-4 pl-16 text-white hover:border-sky-400/20 focus:border-sky-400/20 focus:outline-none"
								/>
								<span className="pointer-events-none absolute left-[1.2rem] text-white">USD</span>
							</div>
						</div>
					</Container>

					<PrimaryButton className="fixed bottom-0 left-0 w-full">Apply filters</PrimaryButton>
				</div>
			</Container>
		</div>
	);
};
