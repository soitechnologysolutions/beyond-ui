import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ScheduleReleased: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="The agenda is live!" title="Schedule Released">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Schedule is Live!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We have officially published the full agenda for our upcoming event. Check out the incredible lineup of speakers and workshops.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Agenda</EmailButton>
    </Section>
  </EmailLayout>
);
export default ScheduleReleased;