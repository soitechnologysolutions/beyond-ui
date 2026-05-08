import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const DripCampaignComplete: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="You made it to the end!" title="Course Complete">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Congratulations! 🎉</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      You've successfully completed the entire email course series. We hope you feel more confident and equipped to tackle your next project!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Get Your Certificate</EmailButton>
    </Section>
  </EmailLayout>
);
export default DripCampaignComplete;