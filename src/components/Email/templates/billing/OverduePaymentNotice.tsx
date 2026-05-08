import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface OverduePaymentNoticeProps {
  userName?: string;
  amountDue?: string;
  suspensionDate?: string;
  paymentLink?: string;
}

export const OverduePaymentNotice: React.FC<OverduePaymentNoticeProps> = ({
  userName = 'User',
  amountDue = '$29.00',
  suspensionDate = 'May 15, 2026',
  paymentLink = 'https://example.com/billing/pay'
}) => {
  return (
    <EmailLayout previewText="Final Notice: Payment Overdue" title="Overdue Payment">
      <Text className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Payment Overdue</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your recent payment of <strong>{amountDue}</strong> is currently overdue.
      </Text>
      <Section className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
        <Text className="text-red-800 dark:text-red-200 m-0">
          To avoid account suspension and keep access to your workspace, please process your payment by <strong>{suspensionDate}</strong>.
        </Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={paymentLink}>Pay Balance Now</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default OverduePaymentNotice;