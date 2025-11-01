import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: {},
    className: "className",
    onClick: () => {},
    bordered: true,
    shadow: true,
    cardTitle: "cardTitle",
    cardBody: "cardBody",
    cardButtonLabel: "cardButtonLabel"
  }
};