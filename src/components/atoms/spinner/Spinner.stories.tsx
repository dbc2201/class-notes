import type {Meta, StoryObj} from "@storybook/react-vite";
import {Spinner} from "./Spinner";

const meta = {
    title: "components/atoms/Spinner",
    component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default spinner
 */
export const Default: Story = {
    args: {
        size: "md",
        color: "#2563eb",
    },
};

/**
 * Spinner sizes
 */
export const Sizes: Story = {
    render: () => (
        <div style={{display: "flex", gap: 16, alignItems: "center"}}>
            <Spinner size="sm" color="#2563eb"/>
            <Spinner size="md" color="#2563eb"/>
            <Spinner size="lg" color="#2563eb"/>
        </div>
    ),
};

/**
 * Spinner with different colors
 */
export const Colors: Story = {
    render: () => (
        <div style={{display: "flex", gap: 16, alignItems: "center"}}>
            <Spinner color="#ef4444"/> {/* red */}
            <Spinner color="#22c55e"/> {/* green */}
            <Spinner color="#f59e0b"/> {/* amber */}
            <Spinner color="#0ea5e9"/> {/* sky */}
        </div>
    ),
};

/**
 * Spinner inheriting parent color (currentColor)
 */
export const InheritColor: Story = {
    render: () => (
        <div style={{color: "#7c3aed"}}>
            <Spinner/>
        </div>
    ),
};
