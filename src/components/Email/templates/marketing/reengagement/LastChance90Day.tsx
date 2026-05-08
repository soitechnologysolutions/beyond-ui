import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const LastChance90Day: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Final Notice regarding your account" title="Account Inactive">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Do you still want to hear from us?</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We notice you haven't opened any of our emails recently. If we don't hear from you, we'll remove you from our mailing list soon to keep your inbox clean.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Keep Me Subscribed</EmailButton>
    </Section>
  </EmailLayout>
);
export default LastChance90Day;