import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface PrivacyPolicyUpdateProps {
  userName?: string;
  effectiveDate?: string;
  policyLink?: string;
}

export const PrivacyPolicyUpdate: React.FC<PrivacyPolicyUpdateProps> = ({
  userName = 'User',
  effectiveDate = 'June 1, 2026',
  policyLink = 'https://example.com/legal/privacy'
}) => {
  return (
    <EmailLayout previewText="We've updated our Privacy Policy" title="Privacy Policy Update">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to our Privacy Policy</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, to provide more transparency about how we collect and use your data, we have published an updated Privacy Policy.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        These updates will take effect on <strong>{effectiveDate}</strong>. By continuing to use our services on or after this date, you acknowledge and agree to the updated policy.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={policyLink}>Read the Privacy Policy</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default PrivacyPolicyUpdate;