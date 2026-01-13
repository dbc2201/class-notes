import type {Meta, StoryObj} from "@storybook/react";
import {Icon} from "./Icon";

const meta = {
    title: "atoms/Icon",
    component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "search",
        size: "md",
        color: "#111827",
    },
};
