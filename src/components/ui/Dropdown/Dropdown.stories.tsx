import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const items = [
  {
    label: "Edit",
    value: "edit",
    onClick: () => console.log("Edit clicked"),
  },
  {
    label: "Delete",
    value: "delete",
    onClick: () => console.log("Delete clicked"),
  },
];

const meta = {
  title: "UI/Dropdown", // ✅ REQUIRED
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <button className="btn">Open Menu</button>, // ✅ ReactNode
    items, // ✅ required
    position: "bottom",
  },
};
