import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface SubscriptionConfirmationProps {
  userName?: string;
  planName?: string;
  price?: string;
  billingCycle?: string;
  dashboardLink?: string;
}

export const SubscriptionConfirmation: React.FC<SubscriptionConfirmationProps> = ({
  userName = 'User',
  planName = 'Pro Plan',
  price = '$29.00',
  billingCycle = 'per month',
  dashboardLink = 'https://example.com/dashboard/billing'
}) => {
  return (
    <EmailLayout previewText={`Your ${planName} subscription is active`} title="Subscription Confirmed">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Subscription Confirmed</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi {userName}, your account has been successfully upgraded. You now have full access to all the features included in the {planName}.
      </Text>
      <Section className="bg-gray-50 p-6 rounded-lg mb-6 text-center border border-gray-100">
        <Text className="text-gray-500 m-0 mb-2 uppercase tracking-wide text-xs font-bold">Current Plan</Text>
        <Text className="text-2xl font-bold text-gray-900 m-0 mb-1">{planName}</Text>
        <Text className="text-gray-600 m-0">{price} {billingCycle}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={dashboardLink}>Go to Dashboard</EmailButton>
      </Section>
      <Text className="text-gray-700 text-base leading-relaxed mb-4">Thank you for choosing us!</Text>
    </EmailLayout>
  );
};

export default SubscriptionConfirmation;