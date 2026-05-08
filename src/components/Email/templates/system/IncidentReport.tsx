import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface IncidentReportProps {
  incidentSummary?: string;
  duration?: string;
  rootCause?: string;
  fixApplied?: string;
  statusPageLink?: string;
}

export const IncidentReport: React.FC<IncidentReportProps> = ({
  incidentSummary = 'Database connectivity issues causing intermittent downtime.',
  duration = '45 minutes (14:00 UTC - 14:45 UTC)',
  rootCause = 'A misconfigured network route caused a spike in latency between our application layer and the primary database cluster.',
  fixApplied = 'We have reverted the network routing change and implemented new automated tests to prevent this specific configuration error from being deployed again.',
  statusPageLink = 'https://status.example.com/incidents/123'
}) => {
  return (
    <EmailLayout previewText="Incident Report & Post-Mortem" title="Incident Report">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post-Incident Report</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        We recently experienced a service disruption. We know you rely on our platform, and we sincerely apologize for the inconvenience. Here is a summary of what happened and how we fixed it.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-700 dark:text-gray-300 m-0 mb-4"><strong>Incident:</strong><br/>{incidentSummary}</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0 mb-4"><strong>Duration:</strong><br/>{duration}</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0 mb-4"><strong>Root Cause:</strong><br/>{rootCause}</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0"><strong>Resolution & Prevention:</strong><br/>{fixApplied}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={statusPageLink}>View Full Status Report</EmailButton>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Thank you for your patience and understanding while we resolved this issue.</Text>
    </EmailLayout>
  );
};

export default IncidentReport;