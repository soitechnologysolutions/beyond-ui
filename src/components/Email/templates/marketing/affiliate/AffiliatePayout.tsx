import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const AffiliatePayout: React.FC<{ amount?: string; link?: string }> = ({ 
  amount = '$150.00', 
  link = '#' 
}) => (
  <EmailLayout previewText={`Your payout of ${amount} is on the way!`} title="Payout Processed">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You've Got Paid!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">Great job! We have just processed your affiliate payout for <strong>{amount}</strong>. It should arrive in your account shortly.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Statement</EmailButton>
    </Section>
  </EmailLayout>
);
export default AffiliatePayout;
