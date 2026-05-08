import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../components';

export interface AccountDeletedConfirmationProps {
  userName?: string;
  deletionDate?: string;
  reactivationDeadline?: string;
}

export const AccountDeletedConfirmation: React.FC<AccountDeletedConfirmationProps> = ({
  userName = 'User',
  deletionDate = 'May 8, 2026',
  reactivationDeadline = 'June 7, 2026'
}) => {
  return (
    <EmailLayout previewText="Your account has been deleted" title="Account Deleted">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Deletion Confirmed</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your account was successfully deleted on {deletionDate}.
      </Text>
      <Section className="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-6 border border-red-100 dark:border-red-800">
        <Text className="text-red-800 dark:text-red-200 m-0 leading-relaxed">
          Your personal data has been queued for permanent deletion. If you change your mind, you can recover your account by logging in before <strong>{reactivationDeadline}</strong>. After this date, all data will be permanently erased and cannot be recovered.
        </Text>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">We're sorry to see you go! If you ever decide to come back, you're always welcome.</Text>
    </EmailLayout>
  );
};

export default AccountDeletedConfirmation;