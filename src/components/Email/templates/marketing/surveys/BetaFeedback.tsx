import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BetaFeedback: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="How is the new feature working for you?" title="Beta Feedback">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Beta Tester Feedback</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Thank you for being part of our exclusive beta program. Have you run into any bugs or friction? Let our engineers know so we can smooth it out before launch.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Report an Issue</EmailButton>
    </Section>
  </EmailLayout>
);
export default BetaFeedback;
