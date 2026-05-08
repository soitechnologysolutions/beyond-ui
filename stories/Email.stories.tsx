import type { Meta, StoryObj } from '@storybook/react';
import { EmailShowcase } from '../src/components/Email/EmailShowcase';

const meta: Meta<typeof EmailShowcase> = {
  title: 'Showcase/Email Templates',
  component: EmailShowcase,
    tags: ["autodocs"],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof EmailShowcase>;

export const Default: Story = {};