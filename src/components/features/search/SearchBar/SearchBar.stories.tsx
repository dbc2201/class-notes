import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {SearchBar} from './SearchBar';

const meta = {
    component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <SearchBar
                value={value}
                placeholder="Search..."
                onChange={setValue}
                onClear={() => setValue("")}
            />
        );
    },
};
