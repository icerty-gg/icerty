import { Meta, StoryObj } from '@storybook/react'
import { CategoryItem } from './CategoryItem'

const meta: Meta<typeof CategoryItem> = {
  title: 'CategoryItem',
  component: CategoryItem,
  args: {
    name: 'Furniture',
    img: 'https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/categories/Meble.jpg',
    id: '#'
  }
}

export default meta

type Story = StoryObj<typeof CategoryItem>

export const Normal: Story = {
  args: {
    isSmall: false
  }
}

export const Small: Story = {
  args: {
    isSmall: true
  }
}
