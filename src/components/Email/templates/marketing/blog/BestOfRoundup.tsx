import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BestOfRoundup: React.FC<{ period?: string; link?: string }> = ({ 
  period = 'this month', 
  link = '#' 
}) => (
  <EmailLayout previewText={`Our best content from ${period}`} title="Best of Roundup">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best of the Blog</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">Missed some updates {period}? We've compiled our most popular and impactful articles all in one place.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View the Roundup</EmailButton>
    </Section>
  </EmailLayout>
);
export default BestOfRoundup;
