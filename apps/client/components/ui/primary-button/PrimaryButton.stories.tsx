import { Meta, StoryObj } from '@storybook/react'
import { PrimaryButton } from './PrimaryButton'

const meta: Meta<typeof PrimaryButton> = {
  title: 'Button/PrimaryButton',
  component: PrimaryButton,
  args: {
    children: 'PrimaryButton'
  }
}

export default meta

type Story = StoryObj<typeof PrimaryButton>

export const Link: Story = {
  args: {
    href: '/'
  }
}

export const Button: Story = {
  args: {
    isFormTypeButton: true
  }
}
