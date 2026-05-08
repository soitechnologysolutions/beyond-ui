import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const AffiliateTopPerformer: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Congratulations on an amazing month!" title="Top Performer">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're a Top Performer 🏆</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Congratulations! You were one of our top-performing partners this past month. Keep up the incredible work!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Claim Your Bonus</EmailButton>
    </Section>
  </EmailLayout>
);
export default AffiliateTopPerformer;
