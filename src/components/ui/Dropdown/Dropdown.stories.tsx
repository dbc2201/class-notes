import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

/* 1️⃣ Mock data FIRST */
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

/* 2️⃣ Meta */
const meta = {
    title: "UI/Dropdown",
    component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

/* 3️⃣ Story type */
type Story = StoryObj<typeof meta>;

/* 4️⃣ Stories */
export const Default: Story = {
    args: {
        trigger: <span>Open Menu</span>,
        items,
        position: "bottom",
    },
};

export const Top: Story = {
    args: {
        trigger: <span>Top Menu</span>,
        items,
        position: "top",
    },
};

export const Right: Story = {
    args: {
        trigger: <span>Right Menu</span>,
        items,
        position: "right",
    },
};
