import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface PaymentFailedEmailProps {
  userName?: string;
  amount?: string;
  updatePaymentLink?: string;
}

export const PaymentFailedEmail: React.FC<PaymentFailedEmailProps> = ({
  userName = 'User',
  amount = '$29.00',
  updatePaymentLink = 'https://example.com/billing'
}) => {
  return (
    <EmailLayout previewText="Action Required: Payment Failed" title="Payment Failed">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Failed</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we were unable to process your recent payment of {amount}. To keep your subscription active, please update your payment information.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={updatePaymentLink}>
          Update Payment Details
        </EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">
        If you have already updated your payment information, please ignore this email.
      </Text>
    </EmailLayout>
  );
};

export default PaymentFailedEmail;