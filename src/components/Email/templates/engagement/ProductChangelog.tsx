import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ProductChangelogProps {
  version?: string;
  updates?: string[];
  fixes?: string[];
  releaseLink?: string;
}

export const ProductChangelog: React.FC<ProductChangelogProps> = ({
  version = 'v2.4.0',
  updates = ['Added multi-user collaborative editing', 'New integration with Slack for real-time notifications', 'Redesigned the dashboard settings panel'],
  fixes = ['Fixed an issue where exports would occasionally timeout', 'Resolved timezone display bugs in the calendar view'],
  releaseLink = 'https://example.com/changelog'
}) => {
  return (
    <EmailLayout previewText={`See what's new in ${version}`} title="Product Changelog">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Latest Updates: {version}</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">We've been hard at work making the platform better for you. Here is a quick summary of what's new.</Text>
      
      <Section className="mb-6">
        <Text className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2 m-0">🚀 New Features & Improvements</Text>
        {updates.map((item, idx) => (
          <Text key={idx} className="text-gray-700 dark:text-gray-300 m-0 mb-2 flex">• {item}</Text>
        ))}
      </Section>
      
      <Section className="mb-6">
        <Text className="text-lg font-bold text-green-600 dark:text-green-400 mb-2 m-0">🛠 Bug Fixes</Text>
        {fixes.map((item, idx) => (
          <Text key={idx} className="text-gray-700 dark:text-gray-300 m-0 mb-2 flex">• {item}</Text>
        ))}
      </Section>
      <Section className="text-center"><EmailButton href={releaseLink}>Read the full notes</EmailButton></Section>
    </EmailLayout>
  );
};

export default ProductChangelog;