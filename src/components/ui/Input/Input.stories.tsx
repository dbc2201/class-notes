import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    type: "text",
    value: {},
    onChange: () => {},
    placeholder: "placeholder",
    disabled: false,
    required: true
  }
};

export const RenderingLabelWorks: Story = {
  args: {
    label: "enter name",
    type: "text",
    value: {},
    placeholder: "placeholder",
    disabled: false,
    required: true
  }
};

export const InputTypesWorksProperly: Story = {
  args: {
    label: "label",
    type: "number",
    value: {},
    placeholder: "placeholder",
    disabled: false,
    required: true
  }
};

export const AttributesWorksProperly: Story = {
  args: {
    label: "label",
    type: "email",
    value: {},
    placeholder: "placeholder",
    disabled: false,
    required: false
  }
};

export const DisableStateWorks: Story = {
  args: {
    label: "label",
    type: "email",
    value: {},
    placeholder: "placeholder",
    disabled: true,
    required: false
  }
};

export const ErrorHandlingWorks: Story = {
  args: {
    label: "label",
    type: "email",
    value: {},
    placeholder: "placeholder",
    disabled: true,
    required: false,
    error: "error 404"
  }
};