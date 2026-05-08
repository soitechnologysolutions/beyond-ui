import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface CreditCardExpiringProps {
  userName?: string;
  cardLast4?: string;
  expirationDate?: string;
  updateLink?: string;
}

export const CreditCardExpiring: React.FC<CreditCardExpiringProps> = ({
  userName = 'User',
  cardLast4 = '4242',
  expirationDate = '10/26',
  updateLink = 'https://example.com/billing/payment-methods'
}) => {
  return (
    <EmailLayout previewText="Your payment method is expiring soon" title="Update Payment Method">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Action Required</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, the credit card ending in <strong>{cardLast4}</strong> that we have on file for your subscription is scheduled to expire on <strong>{expirationDate}</strong>.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        To avoid any interruption to your service, please update your payment information as soon as possible.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={updateLink}>Update Payment Details</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default CreditCardExpiring;