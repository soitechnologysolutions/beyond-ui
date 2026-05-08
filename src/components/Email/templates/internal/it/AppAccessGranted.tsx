import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface AppAccessGrantedProps {
  userName?: string;
  appName?: string;
  role?: string;
  appUrl?: string;
}

export const AppAccessGranted: React.FC<AppAccessGrantedProps> = ({
  userName = 'Alex',
  appName = 'Salesforce',
  role = 'Standard User',
  appUrl = 'https://example.com/login'
}) => {
  return (
    <EmailLayout previewText={`You now have access to ${appName}`} title="Application Access Granted">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Granted</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, IT has provisioned your account for <strong>{appName}</strong>.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600 text-center">
        <Text className="text-gray-500 dark:text-gray-400 text-sm m-0 mb-1">Provisioned Role</Text>
        <Text className="text-lg font-bold text-gray-900 dark:text-white m-0">{role}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={appUrl}>Log In to {appName}</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default AppAccessGranted;