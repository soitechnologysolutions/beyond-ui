import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface GDPRComplianceProps {
  userName?: string;
  companyName?: string;
  settingsLink?: string;
}

export const GDPRCompliance: React.FC<GDPRComplianceProps> = ({
  userName = 'User',
  companyName = 'Beyond Corp',
  settingsLink = 'https://example.com/settings/privacy'
}) => {
  return (
    <EmailLayout previewText="Manage your data and privacy preferences" title="Privacy Settings Notice">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Data, Your Control</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, at {companyName}, we believe in empowering you with control over your personal data. 
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        In accordance with the General Data Protection Regulation (GDPR) and our ongoing commitment to your privacy, we want to remind you that you can manage your data, opt out of specific communications, or request a complete export of your account history at any time.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={settingsLink}>Manage Privacy Settings</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default GDPRCompliance;