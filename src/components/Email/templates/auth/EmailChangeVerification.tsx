import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface EmailChangeVerificationProps {
  userName?: string;
  newEmail?: string;
  verificationLink?: string;
  expiryMinutes?: number;
}

export const EmailChangeVerification: React.FC<EmailChangeVerificationProps> = ({
  userName = 'User',
  newEmail = 'new@example.com',
  verificationLink = 'https://example.com/settings/verify-email?token=123',
  expiryMinutes = 30
}) => {
  return (
    <EmailLayout previewText="Verify your new email address" title="Verify Email Change">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Verify your new email</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi {userName}, you recently requested to change the email address associated with your account to <strong>{newEmail}</strong>.
      </Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">Please click the button below to confirm this change. This link will expire in {expiryMinutes} minutes.</Text>
      <Section className="text-center mb-6">
        <EmailButton href={verificationLink}>Verify New Email</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default EmailChangeVerification;