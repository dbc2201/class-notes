import type { Meta, StoryObj } from '@storybook/react-vite';

import { NoteCard } from './NoteCard';

const mockNote = {
  id: "1",
  title: "Learning React",
  content: "React is awesome...",
  tags: ["react", "typescript"],

  author: "Rohit Sharma",
  createdAt: "12 Sep 2025",
};



const meta = {
  component: NoteCard,
} satisfies Meta<typeof NoteCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    note: mockNote,
    onEdit: (id: string) => console.log("Edit clicked", id),
    onDelete: (id: string) => console.log("Delete clicked", id),
    onClick: (id: string) => console.log("Card clicked", id),
  }
};