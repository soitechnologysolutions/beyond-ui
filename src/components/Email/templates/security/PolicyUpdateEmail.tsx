import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface PolicyUpdateEmailProps {
  userName?: string;
  effectiveDate?: string;
  whatChanged?: string;
  policyLink?: string;
}

export const PolicyUpdateEmail: React.FC<PolicyUpdateEmailProps> = ({
  userName = 'User',
  effectiveDate = 'June 1, 2026',
  whatChanged = 'We have updated our data retention guidelines and added new provisions for third-party integrations to comply with recent regulations.',
  policyLink = 'https://example.com/legal/privacy-policy'
}) => {
  return (
    <EmailLayout previewText="Updates to our Privacy Policy" title="Policy Update Notice">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Updates to our Privacy Policy</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-4">Hi {userName},</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        We are writing to let you know that we have published an updated Privacy Policy, which will take effect on <strong>{effectiveDate}</strong>.
      </Text>
      <Section className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <Text className="font-semibold text-gray-900 m-0 mb-2">What changed?</Text>
        <Text className="text-gray-700 m-0">{whatChanged}</Text>
      </Section>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">By continuing to use our services on or after {effectiveDate}, you agree to the updated policy.</Text>
      <Section className="text-center mb-6"><EmailButton href={policyLink}>Read the Full Policy</EmailButton></Section>
    </EmailLayout>
  );
};