import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const AffiliateInvite: React.FC<{ commissionRate?: string; link?: string }> = ({ 
  commissionRate = '20%', 
  link = '#' 
}) => (
  <EmailLayout previewText="Join our Affiliate Program!" title="Become a Partner">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Partner With Us</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">You already love our product, why not get paid to share it? Join our affiliate program and earn a <strong>{commissionRate}</strong> recurring commission.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Apply Now</EmailButton>
    </Section>
  </EmailLayout>
);
export default AffiliateInvite;
