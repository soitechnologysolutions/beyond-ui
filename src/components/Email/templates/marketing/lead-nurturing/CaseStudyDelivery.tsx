import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const CaseStudyDelivery: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Read our newest success story" title="New Case Study">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">See how they did it</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We just published a new case study showing exactly how one of our clients doubled their growth using our platform.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Read the Case Study</EmailButton>
    </Section>
  </EmailLayout>
);
export default CaseStudyDelivery;
