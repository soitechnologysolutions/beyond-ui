import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const AffiliateWelcome: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Welcome to the Affiliate Program!" title="Welcome Aboard">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're Approved!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Welcome to the partner program. Your application has been approved. You can now log into your dashboard to get your unique tracking links and promotional assets.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Access Dashboard</EmailButton>
    </Section>
  </EmailLayout>
);
export default AffiliateWelcome;
