import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const BackInStock: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="It's back!" title="Back in Stock">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Back in Stock!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      You asked us to notify you when it returned, and it's finally here! Your requested item is back in stock.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Shop Now</EmailButton>
    </Section>
  </EmailLayout>
);
export default BackInStock;