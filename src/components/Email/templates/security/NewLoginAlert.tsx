import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface NewLoginAlertProps {
  userName?: string;
  deviceInfo?: string;
  location?: string;
  time?: string;
  isThisYouLink?: string;
}

export const NewLoginAlert: React.FC<NewLoginAlertProps> = ({
  userName = 'User',
  deviceInfo = 'Chrome on MacOS',
  location = 'San Francisco, CA',
  time = 'May 8, 2026, 2:00 PM UTC',
  isThisYouLink = 'https://example.com/security'
}) => {
  return (
    <EmailLayout previewText="New login to your account" title="New Login Alert">
      <Text className="text-2xl font-bold text-gray-900 mb-4">New login detected</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-4">
        Hi {userName}, we noticed a new login to your account from an unrecognized device.
      </Text>
      <Section className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <Text className="text-gray-700 m-0 mb-2"><strong>Device:</strong> {deviceInfo}</Text>
        <Text className="text-gray-700 m-0 mb-2"><strong>Location:</strong> {location}</Text>
        <Text className="text-gray-700 m-0"><strong>Time:</strong> {time}</Text>
      </Section>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        If this was you, you can safely ignore this email. If you don't recognize this activity, please secure your account immediately.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={isThisYouLink}>
          Secure My Account
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};