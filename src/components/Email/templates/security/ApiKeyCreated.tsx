import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface ApiKeyCreatedProps {
  userName?: string;
  keyName?: string;
  creationTime?: string;
  settingsLink?: string;
}

export const ApiKeyCreated: React.FC<ApiKeyCreatedProps> = ({
  userName = 'User',
  keyName = 'Production Server Key',
  creationTime = 'May 8, 2026, 14:00 UTC',
  settingsLink = 'https://example.com/dashboard/developers/api-keys'
}) => {
  return (
    <EmailLayout previewText="A new API key was generated for your account" title="Security Alert: API Key Created">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New API Key Created</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, a new API key (<strong>{keyName}</strong>) was successfully generated for your workspace on {creationTime}.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={settingsLink}>Manage API Keys</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-red-600 dark:text-red-400 text-sm font-semibold">
        If you did not request this key, please revoke it immediately and reset your password to secure your account.
      </Text>
    </EmailLayout>
  );
};

export default ApiKeyCreated;