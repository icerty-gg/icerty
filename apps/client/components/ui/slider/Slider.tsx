"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

import { Container } from "../Container";
import { Heading } from "../Heading";

interface Images {
	id: string;
	img: string;
}

interface Props {
	images: Images[];
}

export const Slider = ({ images }: Props) => {
	return (
		<Container className="relative">
			<Heading title="Images" className="mb-4" />
			<div className="flex h-full w-full items-center justify-center">
				<div className="max-w-[50rem]">
					<Carousel showThumbs={true} swipeable={true} infiniteLoop autoPlay interval={5000}>
						{images.map((i) => {
							return (
								<div key={i.id} className="flex h-full w-full items-center justify-center">
									<Image
										src={i.img}
										alt="Product image"
										width={300}
										height={300}
										className="flex h-full max-h-[40rem] w-full items-center justify-center rounded-xl object-contain"
									/>
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
		</Container>
	);
};
