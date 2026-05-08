import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const MilestoneDiscount: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Thanks for being loyal!" title="Milestone Reached">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You hit a milestone! 🌟</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Thanks for your ongoing loyalty. You've reached a new tier in our rewards program, unlocking exclusive discounts and perks.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Your Perks</EmailButton>
    </Section>
  </EmailLayout>
);
export default MilestoneDiscount;
