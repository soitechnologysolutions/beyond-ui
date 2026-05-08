import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface LeadMagnetDeliveryProps {
  userName?: string;
  resourceName?: string;
  downloadLink?: string;
  exploreMoreLink?: string;
}

export const LeadMagnetDelivery: React.FC<LeadMagnetDeliveryProps> = ({
  userName = 'Alex',
  resourceName = 'The Ultimate Guide to React Email',
  downloadLink = 'https://example.com/download/guide.pdf',
  exploreMoreLink = 'https://example.com/blog'
}) => {
  return (
    <EmailLayout previewText={`Your download: ${resourceName}`} title="Your Requested Resource">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Here is your requested guide!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, thanks for your interest in <strong>{resourceName}</strong>. We've packed this resource with actionable insights that you can start using today.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={downloadLink}>Download Your Copy</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
        Looking for more resources? Check out our blog for weekly tips, tutorials, and case studies.
      </Text>
    </EmailLayout>
  );
};

export default LeadMagnetDelivery;
