import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const WebinarReminder: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Starting in 1 hour!" title="Webinar Reminder">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Starting Soon!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      This is a quick reminder that our upcoming webinar is starting in exactly one hour. Grab a coffee, test your connection, and we'll see you inside!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Join the Room</EmailButton>
    </Section>
  </EmailLayout>
);
export default WebinarReminder;
