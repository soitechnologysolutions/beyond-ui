import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface TermsOfServiceUpdateProps {
  userName?: string;
  effectiveDate?: string;
  termsLink?: string;
}

export const TermsOfServiceUpdate: React.FC<TermsOfServiceUpdateProps> = ({
  userName = 'User',
  effectiveDate = 'July 1, 2026',
  termsLink = 'https://example.com/legal/terms'
}) => {
  return (
    <EmailLayout previewText="We've updated our Terms of Service" title="Terms of Service Update">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to our Terms of Service</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we have recently updated our Terms of Service to reflect new features and to better clarify our user guidelines.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        These changes go into effect on <strong>{effectiveDate}</strong>. We encourage you to review the full text to understand your rights and responsibilities.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={termsLink}>Read the Terms of Service</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default TermsOfServiceUpdate;