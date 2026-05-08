import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const InfographicEmail: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="See the data visually" title="New Infographic">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">By the Numbers</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We parsed through thousands of data points to bring you our latest infographic. Check it out to see the surprising trends we discovered.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Infographic</EmailButton>
    </Section>
  </EmailLayout>
);
export default InfographicEmail;