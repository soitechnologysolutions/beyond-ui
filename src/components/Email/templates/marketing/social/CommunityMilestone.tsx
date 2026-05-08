import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const CommunityMilestone: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="We hit a massive milestone!" title="Community Celebration">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We did it! 🎉</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Our community just crossed a massive milestone, and we couldn't have done it without you. To say thanks, we're doing a massive giveaway on our social channels!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Enter the Giveaway</EmailButton>
    </Section>
  </EmailLayout>
);
export default CommunityMilestone;