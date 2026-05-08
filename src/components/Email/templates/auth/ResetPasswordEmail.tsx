import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ResetPasswordEmailProps {
  userName?: string;
  resetUrl?: string;
  companyName?: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  userName = 'User',
  resetUrl = 'https://example.com/reset-password',
  companyName = 'Beyond Corp'
}) => {
  return (
    <EmailLayout 
      previewText={`Reset your ${companyName} password`}
      title="Reset Password"
    >
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reset Password</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hello {userName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Someone recently requested a password change for your {companyName} account. If this was you, you can set a new password here:
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={resetUrl}>
          Reset Password
        </EmailButton>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
        If you don't want to change your password or didn't request this, just ignore and delete this message.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base">
        Thanks,<br />
        The {companyName} Team
      </Text>
    </EmailLayout>
  );
};

export default ResetPasswordEmail;