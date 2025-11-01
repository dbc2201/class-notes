import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    type: "text",
    value: {},
    onChange: () => {},
    placeholder: "placeholder",
    disabled: true,
    required: true
  }
};