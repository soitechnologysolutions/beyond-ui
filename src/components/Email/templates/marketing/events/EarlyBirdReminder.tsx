import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const EarlyBirdReminder: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Early bird pricing ends soon" title="Pricing Alert">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Early Bird Ends Soon</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      This is your final warning! Our discounted early-bird tickets are disappearing at midnight. Lock in your spot now to save.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Get Tickets</EmailButton>
    </Section>
  </EmailLayout>
);
export default EarlyBirdReminder;