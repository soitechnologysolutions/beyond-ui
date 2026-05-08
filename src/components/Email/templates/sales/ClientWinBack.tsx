import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ClientWinBackProps {
  clientName?: string;
  senderName?: string;
  companyName?: string;
  offer?: string;
  reactivationLink?: string;
}

export const ClientWinBack: React.FC<ClientWinBackProps> = ({
  clientName = 'Alex',
  senderName = 'Jordan',
  companyName = 'Beyond Corp',
  offer = '20% off your next 6 months',
  reactivationLink = 'https://example.com/reactivate?promo=COMEBACK'
}) => {
  return (
    <EmailLayout previewText="We've missed you!" title="We Miss You">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Let's catch up!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {clientName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        It's been a while since we last worked together at {companyName}. We've launched a ton of new features that I think would be a great fit for your current goals.
      </Text>
      <Section className="bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 p-4 rounded-lg mb-6 text-center">
        <Text className="text-blue-800 dark:text-blue-200 font-semibold m-0 mb-4">If you're open to giving us another try, I'd love to offer you <strong>{offer}</strong>.</Text>
        <EmailButton href={reactivationLink}>Claim Your Offer</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default ClientWinBack;