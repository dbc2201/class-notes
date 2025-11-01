import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: () => {},
    onError: () => {},
    isLoading: true,
    cardTitle: "cardTitle",
    cardButtonLabel: "cardButtonLabel",
    error: "error"
  }
};