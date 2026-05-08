import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface EventItem {
  date: string;
  name: string;
  time?: string;
}

export interface CompanyEventsCalendarProps {
  month?: string;
  events?: EventItem[];
  calendarLink?: string;
}

export const CompanyEventsCalendar: React.FC<CompanyEventsCalendarProps> = ({
  month = 'November 2026',
  events = [
    { date: 'Nov 4', name: 'Town Hall Meeting', time: '10:00 AM' },
    { date: 'Nov 11', name: 'Veterans Day (Office Closed)' },
    { date: 'Nov 26', name: 'Thanksgiving Potluck', time: '12:00 PM' }
  ],
  calendarLink = 'https://calendar.example.com'
}) => {
  return (
    <EmailLayout previewText={`Upcoming events for ${month}`} title="Company Events">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events: {month}</Text>
      <Section className="mb-6">
        {events.map((event, index) => (
          <Row key={index} className="bg-gray-50 dark:bg-gray-700 p-4 mb-2 rounded-lg border border-gray-100 dark:border-gray-600">
            <Column style={{ width: '80px' }}><Text className="text-blue-600 dark:text-blue-400 font-bold m-0">{event.date}</Text></Column>
            <Column><Text className="text-gray-900 dark:text-white font-semibold m-0">{event.name}</Text>{event.time && <Text className="text-gray-500 dark:text-gray-400 text-sm m-0 mt-1">{event.time}</Text>}</Column>
          </Row>
        ))}
      </Section>
      <Section className="text-center mb-6"><EmailButton href={calendarLink}>View Full Calendar</EmailButton></Section>
    </EmailLayout>
  );
};

export default CompanyEventsCalendar;