import Image from "next/image";
import Link from "next/link";

interface Props {
	img: string;
	name: string;
}

export const CategoryItem = ({ img, name }: Props) => {
	return (
		<li className="rounded-xl border border-slate-800 bg-gray-800/20 hover:bg-sky-800/10">
			<Link
				className={`flex flex-col items-center gap-6 p-4`}
				href={`/offers?category=${name.toLowerCase()}`}
			>
				<div className="flex items-center justify-center rounded-full bg-sky-400/10">
					<Image
						className="pointer-events-none rounded-md"
						width={100}
						height={100}
						src={img}
						alt={name}
					/>
				</div>

				<h3 className="text-center text-white">{name}</h3>
			</Link>
		</li>
	);
};
