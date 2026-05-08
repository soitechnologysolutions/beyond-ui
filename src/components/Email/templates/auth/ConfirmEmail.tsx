import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ConfirmEmailProps {
  confirmationLink?: string;
  expiryMinutes?: number;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({
  confirmationLink = 'https://example.com/confirm',
  expiryMinutes = 15
}) => {
  return (
    <EmailLayout previewText="Confirm your email address" title="Confirm your email">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm your email address</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Please confirm that you want to use this as your account email address. This link is valid for {expiryMinutes} minutes.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={confirmationLink}>
          Verify Email
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default ConfirmEmail;