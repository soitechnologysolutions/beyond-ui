import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BrowseAbandonment: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Still thinking about it?" title="Items you viewed">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Did something catch your eye?</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We noticed you were browsing some of our top-rated products. If you have any questions or need help deciding, our team is here for you!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Take another look</EmailButton>
    </Section>
  </EmailLayout>
);
export default BrowseAbandonment;
