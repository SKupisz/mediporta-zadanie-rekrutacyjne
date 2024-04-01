import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TagsFilters } from './TagsFilters';

const meta = {
  title: 'Mediporta/TagsFilters',
  component: TagsFilters,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    submitSearchingCallback: fn(),
  },
} satisfies Meta<typeof TagsFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
