import { Meta, StoryObj } from '@storybook/react'
import { BiLockAlt } from 'react-icons/bi'
import { CheckboxInput } from './CheckboxInput'

const meta: Meta<typeof CheckboxInput> = {
  title: 'Form/CheckboxInput',
  component: CheckboxInput,
  args: {
    children: 'Check me'
  }
}

export default meta

type Story = StoryObj<typeof CheckboxInput>

export const Default: Story = {}

export const Error: Story = {
  args: {
    errorMessage: 'Required'
  }
}
