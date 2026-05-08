import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ColdOutreachProps {
  prospectName?: string;
  senderName?: string;
  companyName?: string;
  painPoint?: string;
  solutionValue?: string;
  meetingLink?: string;
}

export const ColdOutreach: React.FC<ColdOutreachProps> = ({
  prospectName = 'Alex',
  senderName = 'Jordan',
  companyName = 'Beyond Corp',
  painPoint = 'scaling your component library consistently',
  solutionValue = 'help teams reduce UI bugs by 40% and ship features twice as fast',
  meetingLink = 'https://calendly.com/example/15min'
}) => {
  return (
    <EmailLayout previewText={`Quick question about ${painPoint}`} title="Let's connect">
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {prospectName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
        I noticed your team has been growing rapidly recently. Usually, engineering leaders tell me that {painPoint} becomes a major bottleneck at this stage.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        At {companyName}, we {solutionValue}. I thought this might be top of mind for you right now, and I'd love to share how we helped similar teams overcome this. Do you have 15 minutes next Tuesday for a quick chat?
      </Text>
      <Section className="mb-6"><EmailButton href={meetingLink}>Book a 15-min chat</EmailButton></Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Best,<br />{senderName}</Text>
    </EmailLayout>
  );
};

export default ColdOutreach;