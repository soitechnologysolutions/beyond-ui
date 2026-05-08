import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface DMCANoticeProps {
  userName?: string;
  contentTitle?: string;
  removalDate?: string;
  disputeLink?: string;
}

export const DMCANotice: React.FC<DMCANoticeProps> = ({
  userName = 'User',
  contentTitle = 'Uploaded File: Project_Alpha.zip',
  removalDate = 'May 8, 2026',
  disputeLink = 'https://example.com/support/dmca-dispute'
}) => {
  return (
    <EmailLayout previewText="Notice of Content Takedown (DMCA)" title="Content Takedown Notice">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notice of Content Takedown</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we have received a formal takedown request under the Digital Millennium Copyright Act (DMCA) regarding content on your account.
      </Text>
      <Section className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-800">
        <Text className="text-red-800 dark:text-red-200 font-semibold m-0 mb-2">Affected Content:</Text>
        <Text className="text-red-700 dark:text-red-300 m-0 mb-4">{contentTitle}</Text>
        <Text className="text-red-800 dark:text-red-200 m-0 text-sm">This content was disabled/removed on {removalDate} to comply with legal requirements.</Text>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">If you believe this takedown was a mistake and you have the right to distribute this material, you may file a counter-notice.</Text>
      <Section className="text-center mb-6">
        <EmailButton href={disputeLink}>File a Counter-Notice</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default DMCANotice;