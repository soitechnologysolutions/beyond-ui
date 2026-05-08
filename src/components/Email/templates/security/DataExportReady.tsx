import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface DataExportReadyProps {
  userName?: string;
  downloadLink?: string;
  expiryDays?: number;
}

export const DataExportReady: React.FC<DataExportReadyProps> = ({
  userName = 'User',
  downloadLink = 'https://example.com/account/export/download?token=123',
  expiryDays = 7
}) => {
  return (
    <EmailLayout previewText="Your account data export is ready" title="Data Export Ready">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your data export is ready</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, the account data you recently requested is now available for download.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={downloadLink}>Download Data Archive</EmailButton>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        For security reasons, this link will expire in {expiryDays} days. If you need a new export after that time, you can request another one from your account settings.
      </Text>
    </EmailLayout>
  );
};

export default DataExportReady;