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
