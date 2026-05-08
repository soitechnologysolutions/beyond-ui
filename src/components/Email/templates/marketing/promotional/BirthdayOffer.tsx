import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BirthdayOffer: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="We got you a little something..." title="Happy Birthday">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Happy Birthday! 🎂</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      To help you celebrate your special day, we've deposited a special discount code into your account! 
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Claim Your Gift</EmailButton>
    </Section>
  </EmailLayout>
);
export default BirthdayOffer;
