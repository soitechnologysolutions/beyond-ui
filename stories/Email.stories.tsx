import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmailShowcase } from '../src/components/Email/EmailShowcase';
import { EmailPreviewer } from '../src/components/Email/components';
import * as AllTemplates from '../src/components/Email/templates';

const CustomDocsPage = () => {
  // Extract all valid React components from the templates export
  const templates = Object.entries(AllTemplates).filter(
    ([name, cmp]) => typeof cmp === 'function' && /^[A-Z]/.test(name)
  );

  return (
    <div className="space-y-12 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">All Email Templates</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A complete visual overview of all {templates.length} available email templates on a single scrolling page.
        </p>
      </div>
      {templates.map(([name, cmp]) => {
        const Component = cmp as React.ElementType;
        // Format component name (e.g., WeeklyNewsletter -> Weekly Newsletter)
        const formattedName = name.replace(/([A-Z])/g, ' $1').trim();
        return (
          <div key={name} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
              {formattedName}
            </h2>
            <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              <EmailPreviewer component={<Component />} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof EmailShowcase> = {
  title: 'Showcase/Email Templates',
  component: EmailShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: 'padded',
    docs: {
      page: CustomDocsPage,
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmailShowcase>;

export const Default: Story = {};