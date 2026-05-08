import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const CuratedIndustryNews: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="The latest news and trends" title="Industry Roundup">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Weekly Industry News</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We scoured the web to find the most important news, updates, and trends in the industry so you don't have to. Here's what you need to know this week.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Read the Roundup</EmailButton>
    </Section>
  </EmailLayout>
);
export default CuratedIndustryNews;
