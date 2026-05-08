import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const PriceDropAlert: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Great news! The price just dropped." title="Price Drop Alert">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Price Drop Alert 📉</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Great news! An item you've been keeping your eye on recently dropped in price. Grab it now before it's gone.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Shop the Item</EmailButton>
    </Section>
  </EmailLayout>
);
export default PriceDropAlert;
