import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface InactivityWarningProps {
  userName?: string;
  daysInactive?: number;
  ctaLink?: string;
  featureHighlights?: string;
}

export const InactivityWarning: React.FC<InactivityWarningProps> = ({
  userName = 'User',
  daysInactive = 14,
  ctaLink = 'https://example.com/dashboard',
  featureHighlights = 'Did you know we recently launched Dark Mode? Log in to check it out!'
}) => {
  return (
    <EmailLayout previewText={`We miss you, ${userName}!`} title="We Miss You">
      <Text className="text-2xl font-bold text-gray-900 mb-4">It's been a while!</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi {userName}, we noticed you haven't been active in {daysInactive} days. We'd love to see you back on the platform.
      </Text>
      <Section className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
        <Text className="text-blue-800 m-0"><strong>What's new:</strong> {featureHighlights}</Text>
      </Section>
      <Section className="text-center mb-6"><EmailButton href={ctaLink}>Log In Now</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 text-sm">If you're having trouble getting started or need help, just reply to this email!</Text>
    </EmailLayout>
  );
};

export default InactivityWarning;