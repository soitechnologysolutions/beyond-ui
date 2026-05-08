import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ProductFeedback: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Help us build a better product" title="Product Feedback">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Have your say!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We are planning our roadmap for the next quarter, and we want your input! Take our quick survey to vote on the features you want to see most.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Take the Survey</EmailButton>
    </Section>
  </EmailLayout>
);
export default ProductFeedback;
