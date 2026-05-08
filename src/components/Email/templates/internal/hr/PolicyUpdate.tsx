import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface PolicyUpdateProps {
  policyName?: string;
  effectiveDate?: string;
  summary?: string;
  documentLink?: string;
}

export const PolicyUpdate: React.FC<PolicyUpdateProps> = ({
  policyName = 'Remote Work Guidelines',
  effectiveDate = 'November 1, 2026',
  summary = 'We have updated our remote work policies to include more flexible hours and new stipend allowances for home office equipment.',
  documentLink = 'https://intranet.example.com/policies/remote-work'
}) => {
  return (
    <EmailLayout previewText={`Update to: ${policyName}`} title="Internal Policy Update">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Policy Update Notice</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Please be advised that the <strong>{policyName}</strong> has been updated, effective <strong>{effectiveDate}</strong>.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-semibold m-0 mb-2">Key Changes:</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0">{summary}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={documentLink}>Read Full Policy</EmailButton>
      </Section>
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">It is required that all employees review the updated policy.</Text>
    </EmailLayout>
  );
};

export default PolicyUpdate;