import type { Meta, StoryObj } from '@storybook/angular';

import { Button } from 'primeng/button';

const meta: Meta<Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    severity: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] },
    size: { control: 'select', options: ['small', 'large', undefined] },
    outlined: { control: 'boolean' },
    text: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    // Add any other controls as needed
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    label: 'Test Button',
    severity: 'primary',
  },
};

export const Primary: Story = {
  args: {
    label: 'Test Button',
  },

};

export const Secondary: Story = {
  args: {
    label: 'Test Button',
    severity: 'secondary',
  },
};

export const Text: Story = {
  args: {
    label: 'Test Button',
    text: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    severity: 'success',
  },
};

export const Info: Story = {
  args: {
    label: 'Info Button',
    severity: 'info',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    severity: 'warn',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    severity: 'danger',
  },
};

export const IconButton: Story = {
  args: {
    icon: 'pi pi-check',
    label: 'Icon Button',
  },
};

export const LoadingButton: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
  },
};

export const RoundedButton: Story = {
  args: {
    label: 'Rounded Button',
    rounded: true,
  },
};

export const OutlinedButton: Story = {
  args: {
    label: 'Outlined Button',
    outlined: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
  },
};

export const Normal: Story = {
  args: {
    label: 'Normal Button',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
  },
};
