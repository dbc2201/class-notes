import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "text",
    color: "color",
    onRemove: () => {}
  }
};

export const BadgeComponentRenderingPass: Story = {
  args: {
    text: "sale 50% off",
    color: "color",
    variant: "primary",
    removable: false
  }
};

export const BadgeComponentVarientsPass: Story = {
  args: {
    text: "sale 50% off",
    color: "color",
    variant: "accent",
    removable: false
  }
};

export const BadgeComponentColorPropPass: Story = {
  args: {
    text: "sale 50% off",
    color: "color",
    variant: "secondary",
    removable: false
  }
};

export const TextContentPass: Story = {
  args: {
    text: "🔥 Hot",
    color: "color",
    variant: "secondary",
    removable: true
  }
};

export const RemovableButtonWorksWithEveryVarients: Story = {
  args: {
    text: "🔥 Hot",
    variant: "accent",
    removable: true,
    color: "green"
  }
};

export const WhitespaceErrorSolved: Story = {
  args: {
    text: "   spaced   ",
    variant: "accent",
    removable: true,
    color: "green"
  }
};