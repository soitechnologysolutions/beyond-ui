import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ConferenceSeries: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Here's what's happening today" title="Daily Agenda">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Day 2</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Welcome back! We have another packed day of keynotes, breakout sessions, and networking. Here is your guide to navigating today's events.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Today's Schedule</EmailButton>
    </Section>
  </EmailLayout>
);
export default ConferenceSeries;
