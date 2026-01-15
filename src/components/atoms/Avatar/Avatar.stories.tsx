import type {Meta, StoryObj} from "@storybook/react-vite";
import {Avatar} from "./Avatar";

const meta = {
    title: "components/atoms/Avatar",
    component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default avatar with initials fallback
 */
export const Default: Story = {
    args: {
        fallback: "AM",
        alt: "Arnab Mandal",
        size: "md",
    },
};

/**
 * Avatar with real image
 */
export const WithImage: Story = {
    args: {
        src: "https://i.pravatar.cc/150?img=5",
        fallback: "AM",
        alt: "User profile",
        size: "md",
    },
};

/**
 * Broken image → fallback test
 */
export const BrokenImage: Story = {
    args: {
        src: "https://example.com/invalid-image.jpg",
        fallback: "NA",
        alt: "Broken avatar",
        size: "md",
    },
};

/**
 * All sizes preview
 */
export const Sizes: Story = {
    render: () => (
        <div style={{display: "flex", gap: 16, alignItems: "center"}}>
            <Avatar fallback="XS" size="xs"/>
            <Avatar fallback="SM" size="sm"/>
            <Avatar fallback="MD" size="md"/>
            <Avatar fallback="LG" size="lg"/>
            <Avatar fallback="XL" size="xl"/>
        </div>
    ),
};
