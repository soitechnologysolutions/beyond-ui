import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface ITOutageReportProps {
  systemName?: string;
  status?: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  description?: string;
  statusPageLink?: string;
}

export const ITOutageReport: React.FC<ITOutageReportProps> = ({
  systemName = 'Internal VPN',
  status = 'Investigating',
  description = 'Some employees are currently unable to connect to the internal VPN. IT is actively investigating the issue.',
  statusPageLink = 'https://it-status.example.com'
}) => {
  const isResolved = status === 'Resolved';
  return (
    <EmailLayout previewText={`IT Alert: ${systemName} is ${status}`} title="IT Outage Report">
      <Text className={`text-2xl font-bold mb-4 ${isResolved ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        IT System Alert: {systemName}
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-semibold m-0 mb-2">Current Status: {status}</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0">{description}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={statusPageLink}>View Status Page</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">Please do not submit individual IT tickets for this issue while it is actively being worked on.</Text>
    </EmailLayout>
  );
};

export default ITOutageReport;