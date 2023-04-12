import { Meta, StoryObj } from "@storybook/react";
import { SecondaryButton } from "./SecondaryButton";

const meta: Meta<typeof SecondaryButton> = {
	title: "SecondaryButton",
	component: SecondaryButton,
	args: {
		children: "SecondaryButton",
	},
};

export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const Button: Story = {
	args: {
		href: "/",
	},
};
