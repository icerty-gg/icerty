import { Meta, StoryObj } from '@storybook/react'
import { BiLockAlt } from 'react-icons/bi'
import { ErrorMessage } from './ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Form/ErrorMessage',
  component: ErrorMessage,
  args: {
    children: 'Error message'
  }
}

export default meta

type Story = StoryObj<typeof ErrorMessage>

export const Default: Story = {}
