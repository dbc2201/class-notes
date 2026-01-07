import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layout } from './Layout';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
        <div className="bg-base-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Dashboard Content</h2>
          <p>This content is rendered inside the Layout component.</p>
        </div>
    ),
  }
};