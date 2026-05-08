import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface PasswordRotationReminderProps {
  userName?: string;
  daysRemaining?: number;
  rotationLink?: string;
}

export const PasswordRotationReminder: React.FC<PasswordRotationReminderProps> = ({
  userName = 'User',
  daysRemaining = 3,
  rotationLink = 'https://identity.example.com/rotate'
}) => {
  return (
    <EmailLayout previewText={`Action Required: Password expires in ${daysRemaining} days`} title="Password Rotation Required">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Password Expiration Notice</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, for security purposes, our company policy requires passwords to be rotated regularly. Your current password will expire in <strong>{daysRemaining} days</strong>.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={rotationLink}>Change Password Now</EmailButton>
      </Section>
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">If your password expires, you will lose access to internal systems until IT resets your account.</Text>
    </EmailLayout>
  );
};

export default PasswordRotationReminder;