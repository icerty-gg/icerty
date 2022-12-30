import { Meta, StoryObj } from '@storybook/react'
import { BiLockAlt } from 'react-icons/bi'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input
}

export default meta

type Story = StoryObj<typeof Input>

export const Password: Story = {
  args: {
    icon: <BiLockAlt className='text-lg' />
  }
}

export const Error: Story = {
  args: {
    icon: <BiLockAlt className='text-lg' />,
    errorMessage: 'Password is invalid'
  }
}
