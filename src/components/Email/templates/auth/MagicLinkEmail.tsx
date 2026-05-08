import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface MagicLinkEmailProps {
  magicLink?: string;
  expiryMinutes?: number;
}

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  magicLink = 'https://example.com/api/auth/magic?token=123',
  expiryMinutes = 15
}) => {
  return (
    <EmailLayout previewText="Your magic link is here" title="Log in to your account">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Log in to your account</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Click the button below to securely log into your account. This link will expire in {expiryMinutes} minutes.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={magicLink}>
          Log in now
        </EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 text-sm">If you didn't request this email, you can safely ignore it.</Text>
    </EmailLayout>
  );
};

export default MagicLinkEmail;