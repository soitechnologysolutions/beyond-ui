import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const PartnerComarketing: React.FC<{ partnerName?: string; link?: string }> = ({ 
  partnerName = 'Acme Corp', 
  link = '#' 
}) => (
  <EmailLayout previewText={`We're teaming up with ${partnerName}!`} title="New Partnership">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We've Partnered Up!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">We are incredibly excited to announce a brand new integration and co-marketing campaign with <strong>{partnerName}</strong>.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Learn More</EmailButton>
    </Section>
  </EmailLayout>
);
export default PartnerComarketing;
