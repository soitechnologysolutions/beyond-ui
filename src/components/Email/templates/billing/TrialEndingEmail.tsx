import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface TrialEndingEmailProps {
  userName?: string;
  trialEndDate?: string;
  upgradeLink?: string;
}

export const TrialEndingEmail: React.FC<TrialEndingEmailProps> = ({
  userName = 'User',
  trialEndDate = 'in 3 days',
  upgradeLink = 'https://example.com/upgrade'
}) => {
  return (
    <EmailLayout previewText="Your trial is ending soon" title="Trial Ending Soon">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your trial ends {trialEndDate}</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we hope you're enjoying the platform. Your free trial is coming to an end soon. Upgrade your plan today to keep access to all premium features!
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={upgradeLink}>
          Upgrade Plan
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default TrialEndingEmail;