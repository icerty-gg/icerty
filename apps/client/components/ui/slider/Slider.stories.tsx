import { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
	title: "Slider",
	component: Slider,
	args: {
		images: [
			{
				img: "https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/drewniane-biurko-7824.jpg",
				id: "1",
			},
			{
				img: "https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/BIURKO_SIMONA_II-1.jpg",
				id: "2",
			},
		],
	},
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {};
