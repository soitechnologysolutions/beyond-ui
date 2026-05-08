import React from 'react';
import { Text, Section, Link } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface SubscriptionCancelledProps {
  userName?: string;
  planName?: string;
  cancellationDate?: string;
  reactivationLink?: string;
}

export const SubscriptionCancelled: React.FC<SubscriptionCancelledProps> = ({
  userName = 'User',
  planName = 'Pro Plan',
  cancellationDate = 'June 8, 2026',
  reactivationLink = 'https://example.com/billing/reactivate'
}) => {
  return (
    <EmailLayout previewText="Your subscription has been cancelled" title="Subscription Cancelled">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription Cancelled</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your {planName} subscription has been successfully cancelled. You will continue to have access to your premium features until the end of your current billing cycle on <strong>{cancellationDate}</strong>.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={reactivationLink}>Reactivate Subscription</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">We're sorry to see you go. If you have a moment, we'd love to hear your feedback on how we can improve.</Text>
    </EmailLayout>
  );
};

export default SubscriptionCancelled;