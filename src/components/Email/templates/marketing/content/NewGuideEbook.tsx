import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const NewGuideEbook: React.FC<{ guideName?: string; link?: string }> = ({ 
  guideName = 'The 2026 Industry Report', 
  link = '#' 
}) => (
  <EmailLayout previewText={`Download: ${guideName}`} title="New Guide Available">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Resource Available</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">We've just released our newest comprehensive guide: <strong>{guideName}</strong>. It's packed with data, insights, and actionable takeaways.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Download Free</EmailButton>
    </Section>
  </EmailLayout>
);
export default NewGuideEbook;
