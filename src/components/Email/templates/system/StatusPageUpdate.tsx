import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface StatusPageUpdateProps {
  incidentName?: string;
  currentStatus?: string;
  updateMessage?: string;
  timestamp?: string;
  statusPageLink?: string;
}

export const StatusPageUpdate: React.FC<StatusPageUpdateProps> = ({
  incidentName = 'API Latency Issues',
  currentStatus = 'Investigating',
  updateMessage = 'We are currently experiencing elevated latency across our primary API endpoints. Our engineering team is actively investigating the root cause.',
  timestamp = 'May 8, 2026 - 15:30 UTC',
  statusPageLink = 'https://status.example.com'
}) => {
  return (
    <EmailLayout previewText={`Incident Update: ${incidentName}`} title="Status Update">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Status Update</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        There has been an update regarding the incident: <strong>{incidentName}</strong>.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 m-0">Status: <span className="text-gray-900 dark:text-white">{currentStatus}</span></Text>
        <Text className="text-xs text-gray-400 dark:text-gray-500 mb-4 m-0">{timestamp}</Text>
        <Text className="text-gray-800 dark:text-gray-200 leading-relaxed m-0">{updateMessage}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={statusPageLink}>View Status Page</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default StatusPageUpdate;