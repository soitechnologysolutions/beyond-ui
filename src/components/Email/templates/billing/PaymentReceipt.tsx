import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface PaymentReceiptProps {
  userName?: string;
  amount?: string;
  date?: string;
  receiptId?: string;
  receiptUrl?: string;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  userName = 'User',
  amount = '$49.00',
  date = 'May 8, 2026',
  receiptId = 'RCPT-98765',
  receiptUrl = 'https://example.com/billing/receipts/98765'
}) => {
  return (
    <EmailLayout previewText={`Payment receipt for ${amount}`} title="Payment Receipt">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank you for your payment!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">Hi {userName}, we've successfully received your payment.</Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-500 dark:text-gray-400 m-0 mb-1 text-sm">Amount Paid</Text>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white m-0 mb-4">{amount}</Text>
        <Row className="mb-2"><Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Date</Text></Column><Column className="text-right"><Text className="text-gray-900 dark:text-white font-medium m-0 text-sm">{date}</Text></Column></Row>
        <Row><Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Receipt ID</Text></Column><Column className="text-right"><Text className="text-gray-900 dark:text-white font-medium m-0 text-sm">{receiptId}</Text></Column></Row>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={receiptUrl}>View Full Receipt</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default PaymentReceipt;