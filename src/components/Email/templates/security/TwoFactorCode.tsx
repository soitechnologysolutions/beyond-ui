import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../components';

export interface TwoFactorCodeProps {
  userName?: string;
  authCode?: string;
  expiryMinutes?: number;
}

export const TwoFactorCode: React.FC<TwoFactorCodeProps> = ({
  userName = 'User',
  authCode = '592 481',
  expiryMinutes = 10
}) => {
  return (
    <EmailLayout previewText={`Your authentication code is ${authCode}`} title="Authentication Code">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Code</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, please use the verification code below to complete your sign in.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mb-6 text-center">
        <Text className="text-4xl font-mono font-bold tracking-[0.25em] text-gray-900 dark:text-white m-0">
          {authCode}
        </Text>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">This code will expire in {expiryMinutes} minutes.</Text>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">If you didn't request this code, please reset your password immediately.</Text>
    </EmailLayout>
  );
};

export default TwoFactorCode;