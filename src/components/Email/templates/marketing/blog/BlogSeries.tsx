import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BlogSeries: React.FC<{ seriesName?: string; partNumber?: number; link?: string }> = ({ 
  seriesName = 'React Server Components', 
  partNumber = 2, 
  link = '#' 
}) => (
  <EmailLayout previewText={`Part ${partNumber} of ${seriesName} is live!`} title={`${seriesName} - Part ${partNumber}`}>
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{seriesName}: Part {partNumber}</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">The next installment of our deep-dive series is now available. Dive in to continue learning.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Read Part {partNumber}</EmailButton>
    </Section>
  </EmailLayout>
);
export default BlogSeries;