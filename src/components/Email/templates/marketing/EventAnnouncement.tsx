import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface EventAnnouncementProps {
  eventName?: string;
  date?: string;
  location?: string;
  registerLink?: string;
}

export const EventAnnouncement: React.FC<EventAnnouncementProps> = ({
  eventName = 'Beyond UI Developer Summit 2026',
  date = 'September 15-16, 2026',
  location = 'San Francisco, CA & Virtual',
  registerLink = 'https://example.com/events/summit-2026'
}) => {
  return (
    <EmailLayout previewText={`Join us at the ${eventName}!`} title="Event Announcement">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're Invited!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        We are thrilled to announce the <strong>{eventName}</strong>, our biggest gathering of the year. Join industry leaders, networking sessions, and deep-dive technical workshops.
      </Text>
      
      <Section className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-6 border border-blue-100 dark:border-blue-800 text-center">
        <Text className="text-blue-800 dark:text-blue-200 font-bold m-0 mb-2">{date}</Text>
        <Text className="text-blue-600 dark:text-blue-300 m-0">{location}</Text>
      </Section>

      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 text-center">
        Early bird tickets are available now at a special discounted rate. Grab yours before they sell out!
      </Text>

      <Section className="text-center mb-6">
        <EmailButton href={registerLink}>Get Tickets Now</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default EventAnnouncement;