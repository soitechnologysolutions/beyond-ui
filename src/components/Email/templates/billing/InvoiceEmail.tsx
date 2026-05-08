import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface InvoiceEmailProps {
  userName?: string;
  amount?: string;
  planName?: string;
  billingPeriod?: string;
  invoiceUrl?: string;
}

export const InvoiceEmail: React.FC<InvoiceEmailProps> = ({
  userName = 'User',
  amount = '$29.00',
  planName = 'Pro Plan',
  billingPeriod = 'May 2026 - Jun 2026',
  invoiceUrl = 'https://example.com/invoice'
}) => {
  return (
    <EmailLayout previewText="Your latest invoice is ready" title="Invoice Available">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Receipt</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, thanks for your continued support! We've successfully processed your payment for the {planName}.
      </Text>
      
      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
        <Row className="mb-2">
          <Column><Text className="text-gray-500 dark:text-gray-400 m-0">Plan</Text></Column>
          <Column className="text-right"><Text className="font-semibold text-gray-900 dark:text-white m-0">{planName}</Text></Column>
        </Row>
        <Row className="mb-2">
          <Column><Text className="text-gray-500 dark:text-gray-400 m-0">Period</Text></Column>
          <Column className="text-right"><Text className="font-semibold text-gray-900 dark:text-white m-0">{billingPeriod}</Text></Column>
        </Row>
        <EmailDivider />
        <Row>
          <Column><Text className="text-gray-900 dark:text-white font-bold m-0">Total</Text></Column>
          <Column className="text-right"><Text className="font-bold text-blue-600 dark:text-blue-400 m-0">{amount}</Text></Column>
        </Row>
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={invoiceUrl}>
          Download PDF
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default InvoiceEmail;