import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const SeasonalCampaign: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Celebrate the season with us!" title="Holiday Special">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Happy Holidays! 🎁</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      To celebrate the season, we are offering exclusive bundles and discounts. Treat yourself or find the perfect gift.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Offers</EmailButton>
    </Section>
  </EmailLayout>
);
export default SeasonalCampaign;
