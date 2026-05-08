import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface WebinarConfirmationProps {
  userName?: string;
  webinarTitle?: string;
  dateTime?: string;
  joinLink?: string;
}

export const WebinarConfirmation: React.FC<WebinarConfirmationProps> = ({
  userName = 'Alex',
  webinarTitle = 'Mastering React Email Components',
  dateTime = 'Thursday, Nov 12th @ 1:00 PM EST',
  joinLink = 'https://zoom.us/j/123456789'
}) => {
  return (
    <EmailLayout previewText={`Registration Confirmed: ${webinarTitle}`} title="Webinar Confirmation">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're Registered!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your spot for <strong>{webinarTitle}</strong> has been confirmed. We can't wait to see you there!
      </Text>
      
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600 text-center">
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 m-0">When</Text>
        <Text className="text-lg font-bold text-gray-900 dark:text-white m-0">{dateTime}</Text>
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={joinLink}>Join Webinar</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">Pro tip: Add this to your calendar so you don't miss it!</Text>
    </EmailLayout>
  );
};

export default WebinarConfirmation;
