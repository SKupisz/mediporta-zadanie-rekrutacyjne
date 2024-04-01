import type { Meta, StoryObj } from '@storybook/react';

import { Tags } from './Tags';

const meta = {
  title: 'Mediporta/Tags',
  component: Tags,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
