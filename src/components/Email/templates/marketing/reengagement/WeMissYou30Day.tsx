import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface WeMissYou30DayProps {
  userName?: string;
  daysInactive?: number;
  returnLink?: string;
}

export const WeMissYou30Day: React.FC<WeMissYou30DayProps> = ({
  userName = 'Alex',
  daysInactive = 30,
  returnLink = 'https://example.com/dashboard'
}) => {
  return (
    <EmailLayout previewText={`We miss you, ${userName}! Come see what's new.`} title="We Miss You">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">It's been a while!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we noticed you haven't logged in for the last {daysInactive} days. We've missed you!
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Since you last visited, we've added some exciting new features that we think you'll love. Jump back in to explore what's changed and pick up right where you left off.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={returnLink}>Log In to Your Account</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default WeMissYou30Day;
